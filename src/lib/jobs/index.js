const { CronJob } = require('cron');

const createCardJob = require('./createCardJob');
const cardImageJob = require('./cardImageJob');

const createCard = new CronJob(
  '*/5 * * * *',
  createCardJob,
  null,
  true,
);

const cardImage = new CronJob(
  '*/3 * * * *',
  cardImageJob,
  null,
  true,
);

module.exports = {
  createCard,
  cardImage,
};
