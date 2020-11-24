const { getDatabase, closeDatabase } = require('../getDatabase');

describe('getDatabase', () => {
  afterAll(() => closeDatabase());

  it('Should return a not null object', () => new Promise((resolve, reject) => {
    getDatabase()
      .then((db) => {
        expect(db).not.toBeNull();
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  }));

  it('Should allow queries if the first parameter is a string', () => new Promise((resolve, reject) => {
    getDatabase('collection')
      .then((db) => db.insertOne({ foo: 'bar' }))
      .then((result) => {
        expect(result).not.toBeNull();
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  }));

  it('Should not allow queries if the first parameter is not a string', () => new Promise((resolve, reject) => {
    getDatabase([])
      .then(() => {
        reject(new Error('Should have thrown an error'));
      })
      .catch((error) => {
        expect(error).toBeInstanceOf(Error);
        resolve();
      });
  }));
});
