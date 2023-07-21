const basic = {
    fire: {
        key: 'fire',
        forgeLevel: 1,
        adjectives: [
            'fire',
            'flame',
            'fiery',
            'scorching',
            'burning',
            'blazing',
            'incendiary',
        ],
    },
    water: {
        key: 'water',
        forgeLevel: 1,
        adjectives: [
            'water',
            'aquatic',
            'torrential',
            'coastal',
            'oceanic',
            'river',
            'lake',
        ],
    },
    earth: {
        key: 'earth',
        forgeLevel: 1,
        adjectives: [
            'earth',
            'earthen',
            'solid',
            'rocky',
            'sturdy',
            'grounded',
        ],
    },
    air: {
        key: 'air',
        forgeLevel: 1,
        adjectives: [
            'air',
            'airborne',
        ],
    },
    nature: {
        key: 'nature',
        forgeLevel: 2,
        adjectives: [
            'verdant',
            'wild',
            'feral',
        ],
    },
    light: {
        key: 'light',
        forgeLevel: 2,
        adjectives: [
            'luminous',
            'radiant',
            'glowing',
            'dazzling',
            'shining',
            'brilliant',
            'gleaming',
            'lustrous',
            'lambent',
            'luminescent',
        ],
    },
    shadow: {
        key: 'shadow',
        forgeLevel: 2,
        adjectives: [
            'shadow',
            'dark',
            'umbral',
            'murky',
            'dim',
            'gloomy',
        ],
    },
    toxic: {
        key: 'toxic',
        forgeLevel: 2,
        adjectives: [
            'toxic',
            'poisonous',
            'noxious',
        ],
    },
    time: {
        key: 'time',
        forgeLevel: 3,
        adjectives: [
            'time',
            'temporal',
            'chronal',
            'chrono',
        ],
    },
    psychic: {
        key: 'psychic',
        forgeLevel: 3,
        adjectives: [
            'psychic',
            'telepathic',
            'clairvoyant',
        ],
    },
    tech: {
        key: 'tech',
        forgeLevel: 3,
        adjectives: [
            'exo-suit',
            'hi-tech',
            'futuristic',
            'automated',
            'holographic',
            'digital',
            'cybernetic',
            'cyber',
        ],
    },
};

const complex = {
    steam: {
        key: 'steam',
        elements: [basic.fire.key, basic.water.key],
        adjectives: [
            'steam',
            'vapor',
            'vaporizing',
            'gaseous',
            'boiling',
        ],
    },
    magma: {
        key: 'magma',
        elements: [basic.fire.key, basic.earth.key],
        adjectives: [
            'magma',
            'molten',
            'lava',
            'eurptive',
        ],
    },
    blaze: {
        key: 'blaze',
        elements: [basic.fire.key, basic.air.key],
        adjectives: [
            'blazing',
            'flaming',
            'fiery',
            'burning',
        ],
    },
    wildfire: {
        key: 'wildfire',
        elements: [basic.fire.key, basic.nature.key],
        adjectives: [
            'wildfire',
            'rampaging',
            'uncontrolled',
            'raging',
        ],
    },
    sun: {
        key: 'sun',
        elements: [basic.fire.key, basic.light.key],
        adjectives: [
            'sun',
            'solar',
            'radiant',
            'bright',
            'daylight',
        ],
    },
    hell: {
        key: 'hell',
        elements: [basic.fire.key, basic.shadow.key],
        adjectives: [
            'hell',
            'infernal',
            'demonic',
            'damned',
            'diabolical',
        ],
    },
    smoke: {
        key: 'smoke',
        elements: [basic.fire.key, basic.toxic.key],
        adjectives: [
            'smoke',
            'polluted',
            'smoggy',
            'smoky',
            'fume',
        ],
    },
    combustion: {
        key: 'combustion',
        elements: [basic.fire.key, basic.time.key],
        adjectives: [
            'combustion',
            'explosive',
            'volatile',
            'ignited',
            'bursting',
        ],
    },
    psychometry: {
        key: 'psychometry',
        elements: [basic.fire.key, basic.psychic.key],
        adjectives: [
            'psychometric',
            'mind-reading',
            'precognitive',
            'sensory',
        ],
    },
    laser: {
        key: 'laser',
        elements: [basic.fire.key, basic.tech.key],
        adjectives: [
            'laser',
            'plasma',
            'ionic',
            'pulse',
        ],
    },
    mud: {
        key: 'mud',
        elements: [basic.water.key, basic.earth.key],
        adjectives: [
            'mud',
            'muddy',
            'silty',
            'clayey',
            'slimy',
            'soggy',
            'mucky',
        ],
    },
    mist: {
        key: 'mist',
        elements: [basic.water.key, basic.air.key],
        adjectives: [
            'mist',
            'misty',
            'foggy',
            'hazy',
            'dewy',
            'nebulous',
        ],
    },
    blood: {
        key: 'blood',
        elements: [basic.water.key, basic.nature.key],
        adjectives: [
            'blood',
            'bloody',
            'sanguine',
            'hematological',
        ],
    },
    holy: {
        key: 'holy',
        elements: [basic.water.key, basic.light.key],
        adjectives: [
            'holy',
            'blessed',
            'divine',
            'sacred',
            'pure',
            'sanctified',
        ],
    },
    abyssal: {
        key: 'abyssal',
        elements: [basic.water.key, basic.shadow.key],
        adjectives: [
            'abyssal',
            'unfathomable',
            'deep-sea',
            'ominous',
            'otherworldly',
            'cthonian',
        ],
    },
    acid: {
        key: 'acid',
        elements: [basic.water.key, basic.toxic.key],
        adjectives: [
            'acid',
            'acidic',
            'corrosive',
            'erosive',
            'caustic',
        ],
    },
    flow: {
        key: 'flow',
        elements: [basic.water.key, basic.time.key],
        adjectives: [
            'flow',
            'flowing',
            'fluid',
            'tide',
        ],
    },
    illusion: {
        key: 'illusion',
        elements: [basic.water.key, basic.psychic.key],
        adjectives: [
            'illusion',
            'illusory',
            'phantasmal',
            'mirage',
            'deceptive',
        ],
    },
    turbine: {
        key: 'turbine',
        elements: [basic.water.key, basic.tech.key],
        adjectives: [
            'turbine',
            'hydromatic',
            'hydropowered',
            'propelling',
            'whirling',
        ],
    },
    sand: {
        key: 'sand',
        elements: [basic.earth.key, basic.air.key],
        adjectives: [
            'sand',
            'sandy',
            'dusty',
            'desert',
            'arid',
        ],
    },
    plant: {
        key: 'plant',
        elements: [basic.earth.key, basic.nature.key],
        adjectives: [
            'plant',
            'leafy',
            'botanic',
            'herbal',
            'green',
        ],
    },
    crystal: {
        key: 'crystal',
        elements: [basic.earth.key, basic.light.key],
        adjectives: [
            'crystal',
            'crystalline',
            'glassy',
            'prismatic',
            'reflective',
        ],
    },
    cave: {
        key: 'cave',
        elements: [basic.earth.key, basic.shadow.key],
        adjectives: [
            'cave',
            'cavernous',
            'subterranean',
            'hollow',
        ],
    },
    dump: {
        key: 'dump',
        elements: [basic.earth.key, basic.toxic.key],
        adjectives: [
            'dump',
            'dumped',
            'junk',
            'junked',
            'abandoned',
            'disposed',
        ],
    },
    earthquake: {
        key: 'earthquake',
        elements: [basic.earth.key, basic.time.key],
        adjectives: [
            'earthquake',
            'quaking',
            'seismic',
            'trembling',
            'tremor',
            'rumbling',
        ],
    },
    telekinesis: {
        key: 'telekinesis',
        elements: [basic.earth.key, basic.psychic.key],
        adjectives: [
            'telekinetic',
            'psychokinetic',
            'levitating',
            'floating',
        ],
    },
    metal: {
        key: 'metal',
        elements: [basic.earth.key, basic.tech.key],
        adjectives: [
            'metal',
            'metallic',
            'iron',
            'steel',
            'alloy',
            'aluminum',
            'titanium',
            'copper',
            'brass',
            'bronze',
            'gold',
            'silver',
            'platinum',
            'lead',
            'tin',
            'zinc',
            'nickel',
            'cobalt',
            'mercury',
        ],
    },
    pollen: {
        key: 'pollen',
        elements: [basic.air.key, basic.nature.key],
        adjectives: [
            'pollen',
            'floral',
            'flower',
            'pollinating',
        ],
    },
    thunder: {
        key: 'thunder',
        elements: [basic.air.key, basic.light.key],
        adjectives: [
            'thunder',
            'thundering',
            'electric',
            'electrical',
            'lightning',
            'storm',
            'stormy',
        ],
    },
    shadowstorm: {
        key: 'shadowstorm',
        elements: [basic.air.key, basic.shadow.key],
        adjectives: [
            'shadowstorm',
            'shadowcloud',
            'shadowtempest',
            'shadowcharged',
            'shadowelectric',
        ],
    },
    pollution: {
        key: 'pollution',
        elements: [basic.air.key, basic.toxic.key],
        adjectives: [
            'pollution',
            'polluted',
            'contaminated',
        ],
    },
    hurricane: {
        key: 'hurricane',
        elements: [basic.air.key, basic.time.key],
        adjectives: [
            'hurricane',
            'cyclonic',
            'whirling',
            'tempest',
        ],
    },
    wind: {
        key: 'wind',
        elements: [basic.air.key, basic.psychic.key],
        adjectives: [
            'wind',
            'gusty',
            'blustery',
            'blowing',
            'breezy',
            'airy',
        ],
    },
    jet: {
        key: 'jet',
        elements: [basic.air.key, basic.tech.key],
        adjectives: [
            'jet',
            'jet-powered',
            'jet-propelled',
            'high-speed',
            'supersonic',
        ],
    },
    life: {
        key: 'life',
        elements: [basic.nature.key, basic.light.key],
        adjectives: [
            'life',
            'infusing',
            'vital',
        ],
    },
    death: {
        key: 'death',
        elements: [basic.nature.key, basic.shadow.key],
        adjectives: [
            'death',
        ],
    },
    venom: {
        key: 'venom',
        elements: [basic.nature.key, basic.toxic.key],
        adjectives: [
            'venom',
            'venomous',
        ],
    },
    growth: {
        key: 'growth',
        elements: [basic.nature.key, basic.time.key],
        adjectives: [
            'growth',
            'flourishing',
            'blooming',
            'sprouting',
            'budding',
            'germinating',
        ],
    },
    hivemind: {
        key: 'hivemind',
        elements: [basic.nature.key, basic.psychic.key],
        adjectives: [
            'hivemind',
            'collective',
            'swarming',
            'connected',
            'synchronized',
        ],
    },
    biotech: {
        key: 'biotech',
        elements: [basic.nature.key, basic.tech.key],
        adjectives: [
            'biotech',
            'bioengineered',
            'bioenhanced',
            'hybrid',
            'genetic',
            'genetically-modified',
            'transgenic',
        ],
    },
    eclipse: {
        key: 'eclipse',
        elements: [basic.light.key, basic.shadow.key],
        adjectives: [
            'eclipse',
        ],
    },
    photocatalysis: {
        key: 'photocatalysis',
        elements: [basic.light.key, basic.toxic.key],
        adjectives: [
            'photocatalysis',
            'photochemical',
            'photoactivated',
            'photoreactive',
        ],
    },
    chronoluminiscence: {
        key: 'chronoluminiscence',
        elements: [basic.light.key, basic.time.key],
        adjectives: [
            'chronoluminiscence',
            'chronoluminescent',
        ],
    },
    dream: {
        key: 'dream',
        elements: [basic.light.key, basic.psychic.key],
        professions: [
            'dream-weaver',
        ],
        adjectives: [
            'dream',
        ],
    },
    photonic: {
        key: 'photonic',
        elements: [basic.light.key, basic.tech.key],
        adjectives: [
            'photonic',
        ],
    },
    corruption: {
        key: 'corruption',
        elements: [basic.shadow.key, basic.toxic.key],
        adjectives: [
            'corruption',
            'corrupted',
            'tainted',
        ],
    },
    night: {
        key: 'night',
        elements: [basic.shadow.key, basic.time.key],
        adjectives: [
            'night',
            'nocturnal',
            'moonlit',
        ],
    },
    nightmare: {
        key: 'nightmare',
        elements: [basic.shadow.key, basic.psychic.key],
        nouns: [
            'horror',
        ],
        professions: [
            'dream-eater',
        ],
        adjectives: [
            'nightmare',
            'nightmarish',
            'dream-eater',
            'haunted',
            'cursed',
        ],
    },
    nanotech: {
        key: 'nanotech',
        elements: [basic.shadow.key, basic.tech.key],
        nouns: [
            'nanobot',
            'nanite',
            'nanomachine',
        ],
        adjectives: [
            'nano',
            'nanotech',
            'miniaturized',
            'molecular',
        ],
    },
    decay: {
        key: 'decay',
        elements: [basic.toxic.key, basic.time.key],
        adjectives: [
            'decaying',
            'rotting',
            'putrid',
            'decomposing',
        ],
    },
    psytox: {
        key: 'psytox',
        elements: [basic.toxic.key, basic.psychic.key],
        adjectives: [
            'psytoxic',
            'psychedelic',
            'hallucinogenic',
            'madness-inducing',
            'mind-shattering',
        ],
    },
    radiation: {
        key: 'radiation',
        elements: [basic.toxic.key, basic.tech.key],
        adjectives: [
            'radioactive',
            'nuclear',
            'atomic',
            'irradiated',
        ],
    },
    astral: {
        key: 'astral',
        elements: [basic.time.key, basic.psychic.key],
        adjectives: [
            'astral',
            'celestial',
            'cosmic',
            'interstellar',
            'intergalactic',
            'interplanetary',
            'interdimensional',
            'transdimensional',
            'transcendent',
            'ethereal',
        ],
    },
    chronomatrix: {
        key: 'chronomatrix',
        elements: [basic.time.key, basic.tech.key],
        adjectives: [
            'chronomatrix',
            'chronometric',
            'time-traveling',
            'time-warping',
        ],
    },
    ai: {
        key: 'ai',
        elements: [basic.psychic.key, basic.tech.key],
        adjectives: [
            'ai',
            'algorithmic',
            'superintelligent',
        ],
    },
};

const forbidden = {
    void: {
        key: 'void',
    }
};

module.exports = {
    basic,
    complex,
    forbidden,
};
