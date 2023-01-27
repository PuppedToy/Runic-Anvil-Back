const { ObjectId } = require('mongodb');
const { getDatabase } = require('../utils/getDatabase');
const { constants } = require('../data/enums');

const { DB_VERSION, CARD_VERSION } = constants;
const DATABASE_NAME = 'cards';

async function search(query = {}) {
  const db = await getDatabase(DATABASE_NAME);

  const $and = [];

  if (!query.ignoreImage) {
    $and.push({ image: { $exists: true } });
    $and.push({ image: { $ne: null } });
  }

  if (query.name) {
    const parts = query.name.split(' ');
    parts.forEach((part) => {
      $and.push({ name: { $regex: part, $options: 'i' } });
    });
  }

  if (query.type) {
    $and.push({ type: query.type });
  }

  if (query.unitType) {
    $and.push({ unitType: query.unitType });
  }

  if (query.forge) {
    $and.push({ 'forge.type': query.forge });
  }

  if (query.cost) {
    $and.push({ cost: query.cost });
  }

  if (query.minCost) {
    $and.push({ cost: { $gte: query.minCost } });
  }

  if (query.maxCost) {
    $and.push({ cost: { $lte: query.maxCost } });
  }

  if (query.attack) {
    $and.push({ attack: query.attack });
  }

  if (query.minAttack) {
    $and.push({ attack: { $gte: query.minAttack } });
  }

  if (query.maxAttack) {
    $and.push({ attack: { $lte: query.maxAttack } });
  }

  if (query.hp) {
    $and.push({ hp: query.hp });
  }

  if (query.minHp) {
    $and.push({ hp: { $gte: query.minHp } });
  }

  if (query.maxHp) {
    $and.push({ hp: { $lte: query.maxHp } });
  }

  const pagination = {};

  if (query.limit) {
    pagination.limit = query.limit;
  } else {
    pagination.limit = 10;
  }

  if (query.offset) {
    pagination.skip = query.offset;
  } else {
    pagination.skip = 0;
  }

  const findQuery = $and.length ? { $and } : {};
  let data = [];
  if (query.sample) {
    const promisesResult = await Promise.all(
      new Array(parseInt(query.limit, 10) || 1).fill().map(async () => {
        const cards = await db.aggregate([
          { $match: findQuery },
          { $sample: { size: 1 } },
        ]).toArray();
        if (cards.length) {
          return cards[0];
        }
        return null;
      }),
    );
    data = promisesResult.filter((card) => card !== null);
  } else {
    data = await db.find(findQuery)
      .sort({ _id: 1 })
      .limit(pagination.limit)
      .skip(pagination.skip)
      .toArray();
  }
  const total = await db.countDocuments(findQuery);

  return {
    data: data.map((card) => ({ id: card._id, ...card })),
    pagination: {
      limit: pagination.limit,
      offset: pagination.skip,
      nextOffset: pagination.skip + pagination.limit < total
        ? pagination.skip + pagination.limit : null,
      total,
    },
  };
}

async function getById(id) {
  const db = await getDatabase(DATABASE_NAME);
  const card = await db.findOne({ _id: ObjectId(id) });

  return card ? {
    id: card._id,
    ...card,
  } : null;
}

async function findOneWithoutImage() {
  const db = await getDatabase(DATABASE_NAME);
  // find one card that has image to null or that doesn't have image
  const imageCondition = { $or: [{ image: null }, { image: { $exists: false } }] };
  const cardVersionAndImageCondition = { $and: [{ cardVersion: CARD_VERSION }, imageCondition] };
  // Prioritize cards with latest cardVersion
  let card = await db.findOne(cardVersionAndImageCondition);
  if (!card) {
    card = await db.findOne(imageCondition);
  }

  return card ? {
    id: card._id,
    ...card,
  } : null;
}

async function create(card) {
  if (!card) {
    throw new Error('card can\'t be null');
  }

  const db = await getDatabase(DATABASE_NAME);

  const result = await db.insertOne({
    ...card,
    cardVersion: CARD_VERSION,
    version: DB_VERSION,
  });

  return result.ops[0];
}

async function update(id, card) {
  if (!card) {
    throw new Error('card can\'t be null');
  }

  const updatedCard = { ...card };
  if (Object.hasOwnProperty.call(updatedCard, '_id')) {
    delete updatedCard._id;
  }

  const db = await getDatabase(DATABASE_NAME);

  const result = await db.updateOne(
    { _id: ObjectId(id) },
    { $set: updatedCard },
  );

  return result.modifiedCount;
}

module.exports = {
  search,
  getById,
  findOneWithoutImage,
  create,
  update,
};
