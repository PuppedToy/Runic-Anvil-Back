const { ObjectId } = require('mongodb');

let _eval = () => {};
try {
  // This dep is very dangerous in production environment and will only
  // be used in development environment
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  _eval = require('eval');
} catch (e) {
  // Do nothing
}

const { getDatabase } = require('../utils/getDatabase');
const { constants } = require('../data/enums');
const { getCost } = require('../lib/forge/generateForge');

const { DB_VERSION, CARD_VERSION, COST_CACHE_VERSION } = constants;
const DATABASE_NAME = 'cards';

const CARD_VERSION_PARTS = CARD_VERSION.split('.');
const [cardMajor, cardMinor] = CARD_VERSION_PARTS;

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

  let usesCosts = false;
  if (query.cost) {
    $and.push({ costCache: query.cost });
    usesCosts = true;
  }

  if (query.minCost) {
    $and.push({ costCache: { $gte: query.minCost } });
    usesCosts = true;
  }

  if (query.maxCost) {
    $and.push({ costCache: { $lte: query.maxCost } });
    usesCosts = true;
  }

  if (usesCosts) {
    $and.push({ costCacheVersion: COST_CACHE_VERSION });
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

  if (query.rarity) {
    $and.push({ rarityLevel: query.rarity });
  }

  if (query.minRarity) {
    $and.push({ rarityLevel: { $gte: query.minRarity } });
  }

  if (query.maxRarity) {
    $and.push({ rarityLevel: { $lte: query.maxRarity } });
  }

  if (query.triggerEffect) {
    $and.push({ triggers: { $exists: true } });
  } else if (query.triggerEffect === false) {
    $and.push({ triggers: { $exists: false } });
  }

  if (query.cardVersion) {
    if (query.cardVersion === 'latest') {
      $and.push({ cardVersion: CARD_VERSION });
    } else if (query.cardVersion === '^latest') {
      $and.push({ cardVersion: { $regex: new RegExp(`${cardMajor}\\.[0-9]+?\\.[0-9]+?`) } });
    } else if (query.cardVersion === '~latest') {
      $and.push({ cardVersion: { $regex: new RegExp(`${cardMajor}\\.${cardMinor}\\.[0-9]+?`) } });
    } else if (query.cardVersion[0] === '^') {
      const version = query.cardVersion.substring(1);
      const versionParts = version.split('.');
      const [major] = versionParts;
      const $regex = new RegExp(`${major}\\.[0-9]+?\\.[0-9]+?`);
      $and.push({ cardVersion: { $regex } });
    } else if (query.cardVersion[0] === '~') {
      const version = query.cardVersion.substring(1);
      const versionParts = version.split('.');
      const [major, minor] = versionParts;
      $and.push({ cardVersion: { $regex: new RegExp(`${major}\\.${minor}\\.[0-9]+?`) } });
    } else {
      $and.push({ cardVersion: query.cardVersion });
    }
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

async function getByHash(hash) {
  const db = await getDatabase(DATABASE_NAME);
  const card = await db.findOne({ hash });

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

async function customQuery(query) {
  if (process.env === 'production') {
    throw new Error('customQuery is not allowed in production');
  }

  const db = await getDatabase(DATABASE_NAME);
  return db.find(query).toArray();
}

async function cacheCosts() {
  const db = await getDatabase(DATABASE_NAME);
  const allUncachedCards = await db.find({
    $or: [
      { costCache: { $exists: false } },
      { costCacheVersion: { $ne: COST_CACHE_VERSION } },
    ],
  });

  let processedCards = 0;
  const totalCards = await allUncachedCards.count();

  while (await allUncachedCards.hasNext()) {
    const card = await allUncachedCards.next();
    const newCost = getCost(card);

    await db.updateOne(
      { _id: card._id },
      {
        $set: {
          costCache: newCost,
          costCacheVersion: COST_CACHE_VERSION,
        },
      }
    );

    processedCards++;
    console.log(`Processed ${processedCards} of ${totalCards} cards.`);
  }
}

async function removeImageless() {
  const db = await getDatabase(DATABASE_NAME);
  const imagelessCards = await db.find({
    $or: [
      { image: { $exists: false } },
      { image: null },
    ],
  });

  let processedCards = 0;
  const totalCards = await imagelessCards.count();

  while (await imagelessCards.hasNext()) {
    const card = await imagelessCards.next();
    await db.deleteOne({ _id: card._id });

    processedCards++;
    console.log(`Deleted ${processedCards} of ${totalCards} imageless cards.`);
  }
}

async function bulkUpdate(query, stringUpdateCardMethod) {
  if (process.env === 'production') {
    throw new Error('bulkEdit is not allowed in production');
  }

  const db = await getDatabase(DATABASE_NAME);
  const cards = await db.find(query).toArray();
  const promises = [];
  const errors = [];
  cards.forEach((card) => {
    const updateCard = _eval(`${stringUpdateCardMethod}; module.exports = updateCard;`);
    try {
      const updatedCard = updateCard(card);
      promises.push(db.updateOne(
        { _id: card._id },
        {
          $set: {
            ...updatedCard,
          },
        },
      ).catch((error) => {
        errors.push(error);
      }));
    } catch (error) {
      errors.push(error);
    }
  });

  const results = await Promise.all(promises);

  return { results, errors };
}

module.exports = {
  search,
  getById,
  getByHash,
  findOneWithoutImage,
  create,
  update,
  customQuery,
  bulkUpdate,
  cacheCosts,
  removeImageless,
};
