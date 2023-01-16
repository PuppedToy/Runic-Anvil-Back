const express = require('express');
const authRouter = require('./auth/auth.router');
const cardsRouter = require('./cards/cards.router');
const devRouter = require('./dev/dev.router');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/cards', cardsRouter);

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  router.use('/dev', devRouter);
}

module.exports = router;
