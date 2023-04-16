const { CronJob } = require('cron');

const createCardJob = require('./createCardJob');
const cardImageJob = require('./cardImageJob');

if (!process.argv.includes('--nocards')) {
  const createCard = new CronJob(
    '*/3 * * * *',
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
} else {
  module.exports = {};
}
