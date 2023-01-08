const request = require('supertest');

jest.mock('../db');
jest.mock('cron', () => ({
  CronJob: jest.fn(),
}));
jest.mock('../lib/generateCard', () => ({
  generateCard: (level) => {
    if (level === 5) {
      throw new Error('Error');
    } else {
      return {
        id: '123',
        name: 'foo',
        level: 1,
      };
    }
  },
}));

const { app, server } = require('../app');

describe('API', () => {
  afterEach(() => {
    server.close();
  });

  it('Should return status 200 return on GET /alive', () => request(app)
    .get('/alive')
    .then((response) => {
      expect(response.statusCode).toBe(200);
      expect(response.text).toBe('true');
    }));

  it('Should return status 200 on GET /graphql', () => request(app)
    .get('/graphql')
    .set('Accept', 'text/html')
    .then((response) => {
      expect(response.statusCode).toBe(200);
    }));

  describe('Rest API - Auth', () => {
    it('Should return 404 and the expected message when requesting /non-existant', async () => {
      const response = await request(app)
        .get('/non-existant');

      expect(response.statusCode).toBe(404);
      expect(response.body).toHaveProperty('message');
    });

    describe('Auth', () => {
      it('Should return 200 when requesting /auth/login with correct user', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            username: 'foo',
            password: 'password',
          })
          .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('accessToken');
      });

      it('Should return 200 when requesting /auth/login with correct user and JWT_EXPIRATION is unset', async () => {
        const previousExpiration = process.env.JWT_EXPIRATION;
        delete process.env.JWT_EXPIRATION;
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            username: 'foo',
            password: 'password',
          })
          .set('Accept', 'application/json');

        process.env.JWT_EXPIRATION = previousExpiration;
        expect(response.statusCode).toBe(200);
      });

      it('Should return 401 when requesting /auth/login with wrong user', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            username: 'wrong',
            password: 'password',
          })
          .set('Accept', 'application/json');

        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('message');
      });

      it('Should return 500 if an error occurs', async () => {
        const response = await request(app)
          .post('/api/auth/login')
          .send({
            username: 'error',
            password: 'password',
          })
          .set('Accept', 'application/json');

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message');
      });
    });
  });

  describe('Rest API - Dev', () => {
    // beforeEach(() => {
    //   jest.mock('../lib/generateCard', () => ({
    //     generateCard: () => ({
    //       id: '123',
    //       name: 'foo',
    //       level: 1,
    //     }),
    //   }));
    // });

    it('Should return 200 when requesting /dev/simulate/generate-card with level = 1', async () => {
      const response = await request(app)
        .post('/api/dev/simulate/generate-card')
        .send({
          level: 1,
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('card');
      // expect card to he an object
      expect(typeof response.body.card).toBe('object');
    });

    it('Should return 200 when requesting /dev/simulate/generate-card without level', async () => {
      const response = await request(app)
        .post('/api/dev/simulate/generate-card')
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('card');
      // expect card to he an object
      expect(typeof response.body.card).toBe('object');
    });

    it('Should return 500 when requesting /dev/simulate/generate-card with error', async () => {
      const response = await request(app)
        .post('/api/dev/simulate/generate-card')
        .send({
          level: 5,
        })
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('message');
    });
  });
});
