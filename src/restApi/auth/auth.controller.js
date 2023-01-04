const jwt = require('jsonwebtoken');
const db = require('../../db');

async function loginController(req, res, next) {
  try {
    const { username, password } = req.body;

    const user = await db.users.verify(username, password);

    if (!user) {
      return res.status(401).json({
        message: 'Invalid username or password',
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION || '1d',
    });
    return res.status(200).json({
      message: 'Login successful',
      accessToken: token,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  loginController,
};
