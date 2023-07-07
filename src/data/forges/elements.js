const basic = {
    fire: {
        key: 'fire',
        forgeLevel: 1,
    },
    water: {
        key: 'water',
        forgeLevel: 1,
    },
    earth: {
        key: 'earth',
        forgeLevel: 1,
    },
    air: {
        key: 'air',
        forgeLevel: 1,
    },
    nature: {
        key: 'nature',
        forgeLevel: 2,
    },
    light: {
        key: 'light',
        forgeLevel: 2,
    },
    shadow: {
        key: 'shadow',
        forgeLevel: 2,
    },
    toxic: {
        key: 'toxic',
        forgeLevel: 2,
    },
    time: {
        key: 'time',
        forgeLevel: 3,
    },
    psychic: {
        key: 'psychic',
        forgeLevel: 3,
    },
    tech: {
        key: 'tech',
        forgeLevel: 3,
    },
};

const complex = {
    steam: {
        key: 'steam',
        elements: [basic.fire.key, basic.water.key],
    },
    magma: {
        key: 'magma',
        elements: [basic.fire.key, basic.earth.key],
    },
    blaze: {
        key: 'blaze',
        elements: [basic.fire.key, basic.air.key],
    },
    wildfire: {
        key: 'wildfire',
        elements: [basic.fire.key, basic.nature.key],
    },
    sun: {
        key: 'sun',
        elements: [basic.fire.key, basic.light.key],
    },
    hell: {
        key: 'hell',
        elements: [basic.fire.key, basic.shadow.key],
    },
    smoke: {
        key: 'smoke',
        elements: [basic.fire.key, basic.toxic.key],
    },
    combustion: {
        key: 'combustion',
        elements: [basic.fire.key, basic.time.key],
    },
    psychometry: {
        key: 'psychometry',
        elements: [basic.fire.key, basic.psychic.key],
    },
    laser: {
        key: 'laser',
        elements: [basic.fire.key, basic.tech.key],
    },
    mud: {
        key: 'mud',
        elements: [basic.water.key, basic.earth.key],
    },
    mist: {
        key: 'mist',
        elements: [basic.water.key, basic.air.key],
    },
    blood: {
        key: 'blood',
        elements: [basic.water.key, basic.nature.key],
    },
    holy: {
        key: 'holy',
        elements: [basic.water.key, basic.light.key],
    },
    abyssal: {
        key: 'abyssal',
        elements: [basic.water.key, basic.shadow.key],
    },
    acid: {
        key: 'acid',
        elements: [basic.water.key, basic.toxic.key],
    },
    flow: {
        key: 'flow',
        elements: [basic.water.key, basic.time.key],
    },
    illusion: {
        key: 'illusion',
        elements: [basic.water.key, basic.psychic.key],
    },
    turbine: {
        key: 'turbine',
        elements: [basic.water.key, basic.tech.key],
    },
    sand: {
        key: 'sand',
        elements: [basic.earth.key, basic.air.key],
    },
    plant: {
        key: 'plant',
        elements: [basic.earth.key, basic.nature.key],
    },
    crystal: {
        key: 'crystal',
        elements: [basic.earth.key, basic.light.key],
    },
    cave: {
        key: 'cave',
        elements: [basic.earth.key, basic.shadow.key],
    },
    dump: {
        key: 'dump',
        elements: [basic.earth.key, basic.toxic.key],
    },
    earthquake: {
        key: 'earthquake',
        elements: [basic.earth.key, basic.time.key],
    },
    telekinesis: {
        key: 'telekinesis',
        elements: [basic.earth.key, basic.psychic.key],
    },
    metal: {
        key: 'metal',
        elements: [basic.earth.key, basic.tech.key],
    },
    pollen: {
        key: 'pollen',
        elements: [basic.air.key, basic.nature.key],
    },
    thunder: {
        key: 'thunder',
        elements: [basic.air.key, basic.light.key],
    },
    shadowstorm: {
        key: 'shadowstorm',
        elements: [basic.air.key, basic.shadow.key],
    },
    pollution: {
        key: 'pollution',
        elements: [basic.air.key, basic.toxic.key],
    },
    hurricane: {
        key: 'hurricane',
        elements: [basic.air.key, basic.time.key],
    },
    wind: {
        key: 'wind',
        elements: [basic.air.key, basic.psychic.key],
    },
    jet: {
        key: 'jet',
        elements: [basic.air.key, basic.tech.key],
    },
    life: {
        key: 'life',
        elements: [basic.nature.key, basic.light.key],
    },
    death: {
        key: 'death',
        elements: [basic.nature.key, basic.shadow.key],
    },
    venom: {
        key: 'venom',
        elements: [basic.nature.key, basic.toxic.key],
    },
    growth: {
        key: 'growth',
        elements: [basic.nature.key, basic.time.key],
    },
    hivemind: {
        key: 'hivemind',
        elements: [basic.nature.key, basic.psychic.key],
    },
    biotech: {
        key: 'biotech',
        elements: [basic.nature.key, basic.tech.key],
    },
    void: {
        key: 'void',
        elements: [basic.light.key, basic.shadow.key],
    },
    photocatalysis: {
        key: 'photocatalysis',
        elements: [basic.light.key, basic.toxic.key],
    },
    chronoluminiscence: {
        key: 'chronoluminiscence',
        elements: [basic.light.key, basic.time.key],
    },
    dream: {
        key: 'dream',
        elements: [basic.light.key, basic.psychic.key],
    },
    photonic: {
        key: 'photonic',
        elements: [basic.light.key, basic.tech.key],
    },
    corruption: {
        key: 'corruption',
        elements: [basic.shadow.key, basic.toxic.key],
    },
    night: {
        key: 'night',
        elements: [basic.shadow.key, basic.time.key],
    },
    nightmare: {
        key: 'nightmare',
        elements: [basic.shadow.key, basic.psychic.key],
    },
    nanotech: {
        key: 'nanotech',
        elements: [basic.shadow.key, basic.tech.key],
    },
    decay: {
        key: 'decay',
        elements: [basic.toxic.key, basic.time.key],
    },
    psytox: {
        key: 'psytox',
        elements: [basic.toxic.key, basic.psychic.key],
    },
    radiation: {
        key: 'radiation',
        elements: [basic.toxic.key, basic.tech.key],
    },
    astral: {
        key: 'astral',
        elements: [basic.time.key, basic.psychic.key],
    },
    chronomatrix: {
        key: 'chronomatrix',
        elements: [basic.time.key, basic.tech.key],
    },
    ai: {
        key: 'ai',
        elements: [basic.psychic.key, basic.tech.key],
    },
};

module.exports = {
    elements: basic,
    combinations: complex,
};
