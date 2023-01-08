const { CronJob } = require('cron');

const createCardJob = require('./createCardJob');

const createCard = new CronJob(
  '* * * * *',
  createCardJob,
  null,
  true,
);

module.exports = {
  createCard,
};
