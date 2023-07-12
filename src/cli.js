require('dotenv').config();
const {
  generateCards,
  generateCardsWithoutImage,
  cacheCosts,
  removeImageless,
  regenerateHashes,
  checkCommanders,
} = require('./lib/jobs');

const [command, ...args] = process.argv.slice(2);
const DEFAULT_AMOUNT_IMAGE_GENERATION = 50;

if (!command || command === 'help') {
  console.log(`Usage:
    npm run cli -- generate [-a=<amount>] [-l=<level>] [--no-images]
    npm run cli -- help
    `);
  process.exit(0);
}

if (command === 'generate') {
  const noImages = args.includes('--no-images') || args.includes('-ni');
  const amount = args.find((arg) => arg.match(/^-a=\d+$/))?.replace(/^-a=/, '') || DEFAULT_AMOUNT_IMAGE_GENERATION;
  const level = args.find((arg) => arg.match(/^-l=\d+$/))?.replace(/^-l=/, '');
  let method = generateCards;

  if (noImages) {
    method = generateCardsWithoutImage;
  }

  method(amount, { level })
    .then((cards) => {
      console.log(`Generated ${cards.length} cards`);
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

async function preprocessCards() {
  await cacheCosts();
  await removeImageless();
  await regenerateHashes();
  await checkCommanders();
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

if (command == 'remove-imageless') {
  removeImageless()
    .then(() => {
      console.log('Removed imageless cards');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

if (command == 'regenerate-hashes') {
  regenerateHashes()
    .then(() => {
      console.log('Regenerated hashes');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

if (command == 'check-commanders') {
  checkCommanders()
    .then(() => {
      console.log('Checked commanders');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

if (command == 'preprocess-cards') {
  preprocessCards()
    .then(() => {
      console.log('Preprocessed cards');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
