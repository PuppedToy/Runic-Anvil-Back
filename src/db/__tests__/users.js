const { ObjectId } = require('mongodb');

const { getById } = require('../users');
const { getDatabase, closeDatabase, connectDatabase } = require('../../utils/getDatabase');
const emptyDatabase = require('../../utils/testing/emptyDatabase');

describe('Users database methods', () => {
  // eslint-disable-next-line no-unused-vars
  let usersDb;

  beforeAll(() => closeDatabase()
    .then(() => connectDatabase()));

  beforeEach(() => emptyDatabase()
    .then(() => getDatabase('users'))
    .then((db) => {
      // eslint-disable-next-line no-unused-vars
      usersDb = db;
    }));

  afterAll(() => emptyDatabase()
    .then(() => closeDatabase()));

  describe('getById', () => {
    beforeEach(() => getDatabase('users')
      .then((users) => users.insertMany([
        { _id: ObjectId('111111111111111111111111'), name: 'foo' },
        { _id: ObjectId('222222222222222222222222'), name: 'bar' },
        { _id: ObjectId('333333333333333333333333'), name: 'baz' },
      ])));

    it('Should return foo if requested for id 111111111111111111111111', () => new Promise((resolve, reject) => {
      getById('111111111111111111111111')
        .then((retrievedUser) => {
          expect(retrievedUser).toHaveProperty('name', 'foo');
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }));

    it('Should return bar if requested for id 222222222222222222222222', () => new Promise((resolve, reject) => {
      getById('222222222222222222222222')
        .then((retrievedUser) => {
          expect(retrievedUser).toHaveProperty('name', 'bar');
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }));

    it('Should return null if requested for id 444444444444444444444444', () => new Promise((resolve, reject) => {
      getById('444444444444444444444444')
        .then((retrievedUser) => {
          expect(retrievedUser).toBeNull();
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    }));
  });
});
