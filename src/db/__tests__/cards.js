const { ObjectId } = require('mongodb');

const {
  getById,
  create,
  findOneWithoutImage,
  update,
  search,
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
    cardsDb = await getDatabase('cards');
  });

  afterAll(async () => {
    await emptyDatabase();
    await closeDatabase();
  });

  describe('getById', () => {
    beforeAll(async () => {
      const db = await getDatabase('cards');
      await db.insertMany([
        { _id: ObjectId('211111111111111111111111'), name: 'foo' },
        { _id: ObjectId('222222222222222222222222'), name: 'bar' },
      ]);
    });

    afterAll(async () => {
      await emptyDatabase();
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
    afterEach(async () => {
      await emptyDatabase();
    });

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
    beforeEach(async () => {
      await emptyDatabase();
    });

    afterAll(async () => {
      await emptyDatabase();
    });

    it('Should find the card that has no image', async () => {
      await cardsDb.insertMany([
        { _id: ObjectId('311111111111111111111111'), name: 'foo', image: 'fooImage' },
        { _id: ObjectId('322222222222222222222222'), name: 'bar', image: null },
      ]);

      const card = await findOneWithoutImage();
      expect(card).toHaveProperty('name', 'bar');
    });

    it('Should return the card with the latest card version', async () => {
      await cardsDb.insertMany([
        { _id: ObjectId('341111111111111111111111'), name: 'foo', image: null },
        {
          _id: ObjectId('342222222222222222222222'), name: 'bar', image: null, cardVersion: '0.1.0',
        },
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

    afterEach(async () => {
      await emptyDatabase();
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

  describe('search', () => {
    beforeAll(async () => {
      const db = await getDatabase('cards');
      await db.insertMany([
        {
          _id: ObjectId('63bd11287a785523f8b4b3c9'),
          attack: 2,
          hp: 5,
          type: 'unit',
          unitType: 'human',
          level: 1,
          forge: {
            type: 'addPassiveEffect',
            key: 'deadly',
            name: 'Deadly',
            description: 'This unit destroys any unit that receives combat damage from it.',
            text: 'Deadly',
          },
          cost: 312,
          name: 'moral spy, blacksmith',
          cardVersion: '0.0.1',
          rarityLevel: 1,
          version: 1,
          image: '/pics/54c642ff-b9de-493b-9ce9-d4e864f7c478/00000.png',
        },
        {
          _id: ObjectId('63bd11a0203c27376812fa79'),
          attack: 0,
          hp: 2,
          type: 'unit',
          unitType: 'human',
          level: 1,
          forge: {
            type: 'addEffectOnTrigger',
            trigger: {
              key: 'retires',
              name: 'Retires',
              effectType: 'trigger',
              onEffect: 'retire',
            },
            effect: {
              name: 'Modify investment',
              description: 'Modify the investment of the target kingdom',
              target: {
                kingdom: 'owner',
                text: 'the owner',
              },
              operation: 'add',
              value: 15,
              textContext: {},
              text: 'add 15 investment to the owner',
            },
            text: 'Retires: add 15 investment to the owner',
          },
          cost: 92,
          name: 'domestic warder',
          cardVersion: '0.0.1',
          rarityLevel: 1,
          version: 1,
          image: '/pics/7940934a-3d70-4986-97a9-95e740d99f5e/00000.png',
        },
        {
          _id: ObjectId('63bd11dc203c27376812fa7a'),
          attack: 4,
          hp: 5,
          type: 'unit',
          unitType: 'beast',
          level: 1,
          forge: {
            type: 'addUnitType',
            key: 'beast',
            name: 'Beast',
            forgeLevel: 1,
            text: 'Beast',
          },
          cost: 358,
          name: 'olympic sorcerer',
          cardVersion: '0.0.2',
          rarityLevel: 2,
          version: 1,
          image: '/pics/87179d42-fc91-4918-ba68-fd5e3a2f482d/00000.png',
        },
        {
          _id: ObjectId('63bd1218203c27376812fa7b'),
          attack: 1,
          hp: 6,
          type: 'unit',
          unitType: 'human',
          level: 1,
          forge: {
            type: 'addPassiveEffect',
            key: 'challenger',
            name: 'Challenger',
            description: 'When sieging, this unit chooses who blocks it, if eligible.',
            text: 'Challenger',
          },
          cost: 340,
          name: 'gastric blacksmith',
          cardVersion: '0.1.0',
          rarityLevel: 3,
          version: 1,
          image: '/pics/d82811db-dab5-49af-beaa-ca2be4994974/00000.png',
        },
        {
          _id: ObjectId('63be5510e9e1763e90a00bb5'),
          attack: 5,
          hp: 2,
          type: 'unit',
          unitType: 'human',
          level: 1,
          forge: {
            type: 'addPassiveEffect',
            key: 'vampiric',
            name: 'Vampiric',
            description: 'After dealing damage and surviving, this unit heals the amount dealt.',
            text: 'Vampiric',
          },
          cost: 248,
          name: 'opposite goblin of thirst',
          cardVersion: '0.1.0',
          version: 1,
        },
      ]);
    });

    it('Should return all cards with picture if no query is passed', async () => {
      const { data } = await search();
      expect(data).toHaveLength(4);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'domestic warder');
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return pagination data if no query is passed', async () => {
      const { pagination } = await search();
      expect(pagination).toHaveProperty('offset', 0);
      expect(pagination).toHaveProperty('limit', 10);
      expect(pagination).toHaveProperty('nextOffset', null);
      expect(pagination).toHaveProperty('total', 4);
    });

    it('Should return all cards with picture if empty query is passed', async () => {
      const { data } = await search({});
      expect(data).toHaveLength(4);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'domestic warder');
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return all cards if passed flag ignoreImage', async () => {
      const { data } = await search({ ignoreImage: true });
      expect(data).toHaveLength(5);
    });

    it('Should return the expected cards if passed part of a name', async () => {
      const { data } = await search({ name: 'er' });
      expect(data).toHaveLength(2);
      expect(data.shift()).toHaveProperty('name', 'domestic warder');
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
    });

    it('Should return the expected cards if passed full name in capital leters', async () => {
      const { data } = await search({ name: 'MORAL SPY, BLACKSMITH' });
      expect(data).toHaveLength(1);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
    });

    it('Should return the expected cards if passed parts of a name', async () => {
      const { data } = await search({ name: 'spy black' });
      expect(data).toHaveLength(1);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
    });

    it('Should return the expected cards if passed a unit type', async () => {
      const { data } = await search({ unitType: 'human' });
      expect(data).toHaveLength(3);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'domestic warder');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return the expected cards if passed a type', async () => {
      const { data } = await search({ type: 'unit' });
      expect(data).toHaveLength(4);
    });

    it('Should return the expected cards if passed a forge', async () => {
      const { data } = await search({ forge: 'addPassiveEffect' });
      expect(data).toHaveLength(2);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return the expected cards if passed a forge and a unit type', async () => {
      const { data } = await search({ forge: 'addPassiveEffect', unitType: 'human' });
      expect(data).toHaveLength(2);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return the expected card if passed a exact cost', async () => {
      const { data } = await search({ cost: 340 });
      expect(data).toHaveLength(1);
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return the expected cards if passed a minimum cost', async () => {
      const { data } = await search({ minCost: 312 });
      expect(data).toHaveLength(3);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return the expected cards if passed a maximum cost', async () => {
      const { data } = await search({ maxCost: 312 });
      expect(data).toHaveLength(2);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'domestic warder');
    });

    it('Should return the expected cards if passed a minimum and a maximum cost', async () => {
      const { data } = await search({ minCost: 311, maxCost: 341 });
      expect(data).toHaveLength(2);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return no cards if maximum cost is less than minimum', async () => {
      const { data } = await search({ minCost: 341, maxCost: 311 });
      expect(data).toHaveLength(0);
    });

    it('Should return the expected cards if passed a exact attack', async () => {
      const { data } = await search({ attack: 4 });
      expect(data).toHaveLength(1);
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
    });

    it('Should return the expected cards if passed a minimum attack', async () => {
      const { data } = await search({ minAttack: 2 });
      expect(data).toHaveLength(2);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
    });

    it('Should return the expected cards if passed a maximum attack', async () => {
      const { data } = await search({ maxAttack: 2 });
      expect(data).toHaveLength(3);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'domestic warder');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return the expected cards if passed a minimum and a maximum attack', async () => {
      const { data } = await search({ minAttack: 1, maxAttack: 3 });
      expect(data).toHaveLength(2);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return no cards if maximum attack is less than minimum', async () => {
      const { data } = await search({ minAttack: 3, maxAttack: 1 });
      expect(data).toHaveLength(0);
    });

    it('Should return the expected cards if passed a exact hp', async () => {
      const { data } = await search({ hp: 5 });
      expect(data).toHaveLength(2);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
    });

    it('Should return the expected cards if passed a minimum hp', async () => {
      const { data } = await search({ minHp: 3 });
      expect(data).toHaveLength(3);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return the expected cards if passed a maximum hp', async () => {
      const { data } = await search({ maxHp: 3 });
      expect(data).toHaveLength(1);
      expect(data.shift()).toHaveProperty('name', 'domestic warder');
    });

    it('Should return the expected cards if passed a minimum and a maximum hp', async () => {
      const { data } = await search({ minHp: 4, maxHp: 5 });
      expect(data).toHaveLength(2);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
    });

    it('Should return no cards if maximum hp is less than minimum', async () => {
      const { data } = await search({ minHp: 5, maxHp: 2 });
      expect(data).toHaveLength(0);
    });

    it('Should return the expected cards if asked for the latest cardVersion', async () => {
      const { data } = await search({ cardVersion: 'latest' });
      expect(data).toHaveLength(1);
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return the expected cards if asked for the latest cardVersion', async () => {
      const { data } = await search({ cardVersion: '~latest' });
      expect(data).toHaveLength(1);
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return the expected cards if asked for the ^latest cardVersion', async () => {
      const { data } = await search({ cardVersion: '^latest' });
      expect(data).toHaveLength(4);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'domestic warder');
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return the expected cards if asked for the 0.1.0 cardVersion', async () => {
      const { data } = await search({ cardVersion: '0.1.0' });
      expect(data).toHaveLength(1);
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return the expected cards if asked for the 0.0.1 cardVersion', async () => {
      const { data } = await search({ cardVersion: '0.0.1' });
      expect(data).toHaveLength(2);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'domestic warder');
    });

    it('Should return the expected cards if asked for the 0.0.2 cardVersion', async () => {
      const { data } = await search({ cardVersion: '0.0.2' });
      expect(data).toHaveLength(1);
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
    });

    it('Should return no cards if asked for the 0.0.3 cardVersion', async () => {
      const { data } = await search({ cardVersion: '0.0.3' });
      expect(data).toHaveLength(0);
    });

    it('Should return no cards if asked for the ^0.0.1 version', async () => {
      const { data } = await search({ cardVersion: '^0.0.1' });
      expect(data).toHaveLength(4);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'domestic warder');
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return no cards if asked for the ~0.0.1 version', async () => {
      const { data } = await search({ cardVersion: '~0.0.1' });
      expect(data).toHaveLength(3);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'domestic warder');
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
    });

    it('Should return the expected cards if passed a minimum rarity', async () => {
      const { data } = await search({ rarity: 2 });
      expect(data).toHaveLength(1);
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
    });

    it('Should return the expected cards if passed a minimum rarity', async () => {
      const { data } = await search({ minRarity: 2 });
      expect(data).toHaveLength(2);
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return the expected cards if passed a maximum rarity', async () => {
      const { data } = await search({ maxRarity: 2 });
      expect(data).toHaveLength(3);
      expect(data.shift()).toHaveProperty('name', 'moral spy, blacksmith');
      expect(data.shift()).toHaveProperty('name', 'domestic warder');
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
    });

    it('Should return the expected cards if passed a minimum and a maximum rarity', async () => {
      const { data } = await search({ minRarity: 2, maxRarity: 3 });
      expect(data).toHaveLength(2);
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return no cards if maximum rarity is less than minimum', async () => {
      const { data } = await search({ minRarity: 3, maxRarity: 2 });
      expect(data).toHaveLength(0);
    });

    it('Should return the expected cards if passed a limit', async () => {
      const { data } = await search({ limit: 2 });
      expect(data).toHaveLength(2);
    });

    it('Should return the expected pagination if passed a limit', async () => {
      const { pagination } = await search({ limit: 2 });
      expect(pagination).toHaveProperty('limit', 2);
      expect(pagination).toHaveProperty('offset', 0);
      expect(pagination).toHaveProperty('nextOffset', 2);
      expect(pagination).toHaveProperty('total', 4);
    });

    it('Should return the expected cards if passed an offset', async () => {
      const { data } = await search({ offset: 2 });
      expect(data).toHaveLength(2);
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return the expected pagination if passed an offset', async () => {
      const { pagination } = await search({ offset: 2 });
      expect(pagination).toHaveProperty('limit', 10);
      expect(pagination).toHaveProperty('offset', 2);
      expect(pagination).toHaveProperty('nextOffset', null);
      expect(pagination).toHaveProperty('total', 4);
    });

    it('Should return the expected cards if passed a limit and an offset', async () => {
      const { data } = await search({ limit: 1, offset: 2 });
      expect(data).toHaveLength(1);
      expect(data.shift()).toHaveProperty('name', 'olympic sorcerer');
    });

    it('Should return the expected pagination if passed an offset', async () => {
      const { pagination } = await search({ limit: 1, offset: 2 });
      expect(pagination).toHaveProperty('limit', 1);
      expect(pagination).toHaveProperty('offset', 2);
      expect(pagination).toHaveProperty('nextOffset', 3);
      expect(pagination).toHaveProperty('total', 4);
    });

    it('Should return the expected cards if passed a high offset', async () => {
      const { data } = await search({ offset: 3 });
      expect(data).toHaveLength(1);
      expect(data.shift()).toHaveProperty('name', 'gastric blacksmith');
    });

    it('Should return no cards if passed an offset higher than the number of cards', async () => {
      const { data } = await search({ offset: 4 });
      expect(data).toHaveLength(0);
    });

    it('Should return the expected pagination if passed an offset higher than the number of cards', async () => {
      const { pagination } = await search({ offset: 4 });
      expect(pagination).toHaveProperty('limit', 10);
      expect(pagination).toHaveProperty('offset', 4);
      expect(pagination).toHaveProperty('nextOffset', null);
      expect(pagination).toHaveProperty('total', 4);
    });

    it('Should return 1 card if limit is undefined and sample is true', async () => {
      const { data } = await search({ sample: true });
      expect(data).toHaveLength(1);
    });

    it('Should return 0 cards if sample is true and name is unknown', async () => {
      const { data } = await search({ sample: true, name: 'unknown' });
      expect(data).toHaveLength(0);
    });

    it('Should return 6 cards if limit is 6 and sample is true', async () => {
      const { data } = await search({ limit: 6, sample: true });
      expect(data).toHaveLength(6);
    });
  });
});
