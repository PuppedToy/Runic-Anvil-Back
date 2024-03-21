/* eslint-disable max-len */

/**
 * Status effects that seem unfun:
 * - Exhaust: Should drain energy, not prevent it from being gained. Also could mean less energy / turn.
 * - Stun: Overlaps with exhaust
 * - Root: Overlaps with exhaust
 *
 * So, for the future, I will try to keep just exhaust and rework it.
 */

/**
 * Future status effects:
 *
 * - Barrier: Prevents instances of damage for next attacks
 * - Spellshield: Prevents enemy abilities
 */

const statusEffects = {
  exhaust: {
    key: 'exhaust',
  },
  // root: {
  //   key: 'root',
  // },
  // stun: {
  //   key: 'stun',
  // },
  silence: {
    key: 'silence',
  },
  decay: {
    key: 'decay',
  },
  regrowth: {
    key: 'regrowth',
  },
};

module.exports = statusEffects;
