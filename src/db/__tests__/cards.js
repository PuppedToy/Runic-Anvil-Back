const { ObjectId } = require('mongodb');

const { getById, create } = require('../cards');
const { getDatabase, closeDatabase, connectDatabase } = require('../../utils/getDatabase');
const emptyDatabase = require('../../utils/testing/emptyDatabase');

describe('Cards database methods', () => {
  // eslint-disable-next-line no-unused-vars
  let cardsDb;

  beforeAll(async () => {
    await closeDatabase();
    await connectDatabase();
  });

  beforeEach(async () => {
    await emptyDatabase();
    cardsDb = await getDatabase('cards');
  });

  afterAll(async () => {
    await emptyDatabase();
    await closeDatabase();
  });

  describe('getById', () => {
    beforeEach(async () => {
      const db = await getDatabase('cards');
      await db.insertMany([
        { _id: ObjectId('211111111111111111111111'), name: 'foo' },
        { _id: ObjectId('222222222222222222222222'), name: 'bar' },
      ]);
    });

    it('Should return foo if requested for id 211111111111111111111111', async () => {
      const retrievedCard = await getById('211111111111111111111111');
      expect(retrievedCard).toHaveProperty('name', 'foo');
    });

    it('Should return bar if requested for id 222222222222222222222222', async () => {
      const retrievedCard = await getById('222222222222222222222222');
      expect(retrievedCard).toHaveProperty('name', 'bar');
    });

    it('Should return null if requested for id 244444444444444444444444', async () => {
      const retrievedCard = await getById('244444444444444444444444');
      expect(retrievedCard).toBeNull();
    });
  });

  describe('create', () => {
    const sampleCard = {
      name: 'sample',
    };

    it('Should create a card given a simple card object', async () => {
      const expectedSampleCard = {
        _id: expect.any(ObjectId),
        name: 'sample',
        cardVersion: expect.any(String),
        version: expect.any(Number),
      };
      const createdCard = await create({ ...sampleCard });
      expect(createdCard).toEqual(expectedSampleCard);
    });

    it('Should throw an error if card is not provided', async () => {
      await expect(create()).rejects.toThrow();
    });
  });
});
