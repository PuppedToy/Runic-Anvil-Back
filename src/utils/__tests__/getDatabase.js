const getDatabase = require('../getDatabase');

describe('getDatabase', () => {
  it('Test 1', () => new Promise((resolve, reject) => {
    getDatabase()
      .then((db) => {
        expect(db).not.toBeNull();
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  }));
});
