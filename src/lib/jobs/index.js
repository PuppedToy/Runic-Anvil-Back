const { CronJob } = require('cron');

const createCardJob = require('./createCardJob');

const createCard = new CronJob(
  '*/5 * * * * *',
  createCardJob,
  null,
  true,
);

module.exports = {
  createCard,
};
