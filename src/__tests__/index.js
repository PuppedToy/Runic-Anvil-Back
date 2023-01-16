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

      expect(typeof response.body.card).toBe('object');
    });

    it('Should return 200 when requesting /dev/simulate/generate-card without level', async () => {
      const response = await request(app)
        .post('/api/dev/simulate/generate-card')
        .set('Accept', 'application/json');

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('card');

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

  describe('Rest API - Get card', () => {
    it('Should return 200 if requesting an existing card', () => request(app)
      .get('/api/cards/111111111111111111111111')
      .then((response) => {
        const expectedCard = {
          id: '111111111111111111111111',
          name: 'bar',
        };
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toEqual(expectedCard);
      }));

    it('Should return 404 if requesting a non-existing card', () => request(app)
      .get('/api/cards/a2345678901234567890123f')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 500 if an error occurs', () => request(app)
      .get('/api/cards/000000000000000000000000')
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 400 if the card id has less digits', () => request(app)
      .get('/api/cards/12345678901234567890123')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 400 if the card id has wrong format', () => request(app)
      .get('/api/cards/00000000000000000000000z')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));
  });

  describe('Rest API - Search cards', () => {
    it('Should return 200 if requesting without params', () => request(app)
      .get('/api/cards/search')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 200 if requesting with name', () => request(app)
      .get('/api/cards/search?name=bar')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 500 if found an error', () => request(app)
      .get('/api/cards/search?name=error')
      .then((response) => {
        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 404 if found no results', () => request(app)
      .get('/api/cards/search?name=empty')
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with limit', () => request(app)
      .get('/api/cards/search?limit=1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 200 if requesting with offset', () => request(app)
      .get('/api/cards/search?offset=1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 200 if requesting with ignoreImage', () => request(app)
      .get('/api/cards/search?ignoreImage=true')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 400 if requesting with wrong ignoreImage', () => request(app)
      .get('/api/cards/search?ignoreImage=foo')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with type creature', () => request(app)
      .get('/api/cards/search?type=creature')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 200 if requesting with type spell', () => request(app)
      .get('/api/cards/search?type=spell')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 200 if requesting with type weapon', () => request(app)
      .get('/api/cards/search?type=weapon')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 400 if requesting with type invalid', () => request(app)
      .get('/api/cards/search?type=invalid')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with unitType human', () => request(app)
      .get('/api/cards/search?unitType=human')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 200 if requesting with unitType beast', () => request(app)
      .get('/api/cards/search?unitType=beast')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 200 if requesting with unitType invalid', () => request(app)
      .get('/api/cards/search?unitType=invalid')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with forge addPassiveEffect', () => request(app)
      .get('/api/cards/search?forge=addPassiveEffect')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 400 if requesting with forge invalid', () => request(app)
      .get('/api/cards/search?forge=invalid')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with cost 1', () => request(app)
      .get('/api/cards/search?cost=1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 400 if requesting with cost invalid', () => request(app)
      .get('/api/cards/search?cost=invalid')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with minCost 1', () => request(app)
      .get('/api/cards/search?minCost=1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 400 if requesting with minCost invalid', () => request(app)
      .get('/api/cards/search?minCost=invalid')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with maxCost 1', () => request(app)
      .get('/api/cards/search?maxCost=1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 400 if requesting with maxCost invalid', () => request(app)
      .get('/api/cards/search?maxCost=invalid')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with attack 1', () => request(app)
      .get('/api/cards/search?attack=1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 400 if requesting with attack invalid', () => request(app)
      .get('/api/cards/search?attack=invalid')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with minAttack 1', () => request(app)
      .get('/api/cards/search?minAttack=1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 400 if requesting with minAttack invalid', () => request(app)
      .get('/api/cards/search?minAttack=invalid')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with maxAttack 1', () => request(app)
      .get('/api/cards/search?maxAttack=1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 400 if requesting with maxAttack invalid', () => request(app)
      .get('/api/cards/search?maxAttack=invalid')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with hp 1', () => request(app)
      .get('/api/cards/search?hp=1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 400 if requesting with hp invalid', () => request(app)
      .get('/api/cards/search?hp=invalid')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with minHp 1', () => request(app)
      .get('/api/cards/search?minHp=1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 400 if requesting with minHp invalid', () => request(app)
      .get('/api/cards/search?minHp=invalid')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with maxHp 1', () => request(app)
      .get('/api/cards/search?maxHp=1')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 400 if requesting with maxHp invalid', () => request(app)
      .get('/api/cards/search?maxHp=invalid')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 400 if requesting with unknown property', () => request(app)
      .get('/api/cards/search?unknown=1')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));

    it('Should return 200 if requesting with name and unitType', () => request(app)
      .get('/api/cards/search?name=1&unitType=human')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('data');
        expect(response.body).toHaveProperty('pagination');
      }));

    it('Should return 400 if requesting with name and unknown property', () => request(app)
      .get('/api/cards/search?name=1&unknown=1')
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message');
      }));
  });
});
