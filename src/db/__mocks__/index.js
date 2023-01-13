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
        return Promise.resolve({
          id: 'foo',
        });
      } if (id === '111111111111111111111111') {
        return Promise.resolve({
          id: '111111111111111111111111',
          name: 'bar',
        });
      } if (id === '000000000000000000000000') {
        return Promise.reject(new Error());
      }
      return Promise.resolve(null);
    }),
    findOneWithoutImage: jest.fn(() => ({
      id: 'foo',
    })),
    create: jest.fn(() => Promise.resolve()),
    update: jest.fn(() => Promise.resolve()),
  },
};
