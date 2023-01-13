module.exports = {
  users: {
    getById: jest.fn(() => Promise.resolve({
      id: 'foo',
    })),
    verify: jest.fn((name) => new Promise((resolve, reject) => {
      if (name === 'foo') {
        resolve({
          _id: 1,
          name: 'foo',
        });
      } else if (name === 'error') {
        reject(new Error());
      } else {
        resolve(null);
      }
    })),
    create: jest.fn((name) => new Promise((resolve, reject) => {
      if (name === 'foo') {
        resolve();
      } else {
        reject();
      }
    })),
  },
  cards: {
    getById: jest.fn((id) => {
      if (id === 'foo') {
        Promise.resolve({
          id: 'foo',
        });
      } else if (id === '111111111111111111111111') {
        Promise.resolve({
          id: '111111111111111111111111',
          name: 'bar',
        });
      } else if (id === '000000000000000000000000') {
        Promise.reject(new Error());
      } else {
        Promise.resolve(null);
      }
    }),
    findOneWithoutImage: jest.fn(() => ({
      id: 'foo',
    })),
    create: jest.fn(() => Promise.resolve()),
    update: jest.fn(() => Promise.resolve()),
  },
};
