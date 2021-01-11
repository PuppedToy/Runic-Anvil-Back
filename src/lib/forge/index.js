const generateForge = require('./generateForge');

class Forge {
  constructor() {
    const forge = generateForge();
    Object.entries(forge).forEach(([key, value]) => {
      this[key] = value;
    });
  }
}

module.exports = Forge;
