require('dotenv').config();
const { generateCards, generateCardsWithoutImage, cacheCosts } = require('./lib/jobs');

const [command, ...args] = process.argv.slice(2);
const DEFAULT_AMOUNT_IMAGE_GENERATION = 50;

if (!command || command === 'help') {
  console.log(`Usage:
    npm run cli -- generate [-a=<amount>] [--no-images]
    npm run cli -- help
    `);
  process.exit(0);
}

if (command === 'generate') {
  const noImages = args.includes('--no-images') || args.includes('-ni');
  const amount = args.find((arg) => arg.match(/^-a=\d+$/))?.replace(/^-a=/, '') || DEFAULT_AMOUNT_IMAGE_GENERATION;
  let method = generateCards;

  if (noImages) {
    method = generateCardsWithoutImage;
  }

  method(amount)
    .then((cards) => {
      console.log(`Generated ${cards.length} cards`);
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

if (command == 'cache-costs') {
  cacheCosts()
    .then(() => {
      console.log('Cached costs');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}