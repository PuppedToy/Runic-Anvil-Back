jest.mock('../../../db');

const login = require('../login');

describe('Users API methods', () => {
  describe('login', () => {
    it('Should return a String token if verify method returns true', () => new Promise((resolve, reject) => {
      login({ name: 'foo', password: 'bar' })
        .then((token) => {
          expect(token).toBeTruthy();
          expect(typeof token).toBe('string');
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }));

    it('Should return null if verify returns false', () => new Promise((resolve, reject) => {
      login({ name: 'baz', password: 'bar' })
        .then((token) => {
          expect(token).toBeNull();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }));

    it('Should return null if verify throws an error', () => new Promise((resolve, reject) => {
      login({ name: 'error', password: 'bar' })
        .then((token) => {
          expect(token).toBeNull();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }));
  });
});
