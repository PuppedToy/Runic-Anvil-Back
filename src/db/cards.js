const { ObjectId } = require('mongodb');
const { getDatabase } = require('../utils/getDatabase');

const DB_VERSION = parseInt(process.env.DB_VERSION, 10);
const { CARD_VERSION } = process.env;
const DATABASE_NAME = 'cards';

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
  const card = await db.findOne({ $or: [{ image: null }, { image: { $exists: false } }] });

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

  const db = await getDatabase(DATABASE_NAME);

  const result = await db.updateOne(
    { _id: ObjectId(id) },
    { $set: { ...card } },
  );

  return result;
}

module.exports = {
  getById,
  findOneWithoutImage,
  create,
  update,
};
