const request = require('supertest');

jest.mock('../db');
const app = require('../app');

describe('API', () => {
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

  describe('Rest API Integration', () => {
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
    });
  });
});
