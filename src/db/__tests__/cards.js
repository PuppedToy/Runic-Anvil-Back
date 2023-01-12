const { ObjectId } = require('mongodb');

const {
  getById,
  create,
  findOneWithoutImage,
  update,
} = require('../cards');
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

  describe('findOneWithoutImage', () => {
    it('Should find the card that has no image', async () => {
      await cardsDb.insertMany([
        { _id: ObjectId('311111111111111111111111'), name: 'foo', image: 'fooImage' },
        { _id: ObjectId('322222222222222222222222'), name: 'bar', image: null },
      ]);

      const card = await findOneWithoutImage();
      expect(card).toHaveProperty('name', 'bar');
    });

    it('Should return null if every card has image', async () => {
      await cardsDb.insertMany([
        { _id: ObjectId('331111111111111111111111'), name: 'foo', image: 'fooImage' },
        { _id: ObjectId('332222222222222222222222'), name: 'bar', image: 'barImage' },
      ]);

      const card = await findOneWithoutImage();
      expect(card).toBeNull();
    });
  });

  describe('update', () => {
    beforeEach(async () => {
      await cardsDb.insertOne({
        _id: ObjectId('411111111111111111111111'),
        name: 'foo',
      });
    });

    it('Should throw if card is not passed', async () => {
      await expect(update('411111111111111111111111')).rejects.toThrow();
    });

    it('Should not update _id field', async () => {
      await update('411111111111111111111111', { _id: 'newId' });
      const card = await cardsDb.findOne({ _id: ObjectId('411111111111111111111111') });
      expect(card).toHaveProperty('_id', ObjectId('411111111111111111111111'));
    });

    it('Should return null if the card does not exist', async () => {
      const updatedCount = await update('444444444444444444444444', { name: 'newName' });
      expect(updatedCount).toBe(0);
    });

    it('Should update a previous field of the card', async () => {
      const updatedCount = await update('411111111111111111111111', { name: 'newName' });
      const updatedCard = await cardsDb.findOne({ _id: ObjectId('411111111111111111111111') });
      expect(updatedCount).toBe(1);
      expect(updatedCard).toHaveProperty('name', 'newName');
    });

    it('Should create a new field of the card', async () => {
      const updatedCount = await update('411111111111111111111111', { newField: 'newField' });
      const updatedCard = await cardsDb.findOne({ _id: ObjectId('411111111111111111111111') });
      expect(updatedCount).toBe(1);
      expect(updatedCard).toHaveProperty('newField', 'newField');
    });
  });
});
