const templates = [
  {
    type: 'unit',
    forgeLevel: 1,
    value: '$adjective $mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 1,
    value: '$adjective $profession',
  },
  {
    type: 'unit',
    forgeLevel: 1,
    value: '$profession $mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 1,
    value: '$mainNoun, $profession',
  },
  {
    type: 'unit',
    forgeLevel: 1,
    value: '$mainNoun of $otherNoun',
  },
  {
    type: 'unit',
    forgeLevel: 1,
    value: '$profession of $otherNoun',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$adjective $mainNoun in $region',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$adjective $profession of $otherNoun',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$adjective $profession $mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$adjective $profession in $region',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$profession of $otherNoun and $otherNoun',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$adjective $mainNoun of $otherNoun',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$profession $mainNoun of $otherNoun',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$adjective $mainNoun, $profession',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$mainNoun of the $adjective $otherNoun',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$adjective and $adjective $mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$mainNoun-$mainNoun of $otherNoun',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$mainNoun for the $adjective $otherNoun',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$profession-$profession $mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$profession for the $adjective',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$mainNoun of $region',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$profession of $region',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$region\'s $mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$profession of the $adjective',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$adjective $otherNoun$profession',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$otherNoun$profession $mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$profession-$profession of $region',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$otherNoun$profession of $region',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$adjective $otherNoun$profession of $region',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$region\'s $adjective $otherNoun$profession',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$otherNoun$profession $profession',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$adjective $otherNoun$profession',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$otherNoun-$otherNoun $mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$profession and $profession $mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $profession of the $otherNoun $professions',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $mainNoun-$mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $otherNoun$mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $otherNoun$profession',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $adjective $mainNoun-$mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $adjective $otherNoun$mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $adjective $otherNoun$profession',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $region\'s $adjective $otherNoun$profession',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $adjective-$adjective $mainNoun of $region',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $adjective $profession of $properNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $region\'s $otherNoun $profession',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $mainNoun of $otherNoun and $otherNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$adjective $otherNoun$mainNoun $properNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun the $otherNoun$adjective',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$adjective $properNoun, $region\'s $otherNoun$mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $otherNoun $mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $otherNoun $adjective',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $region\'s $profession',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$adjective and $adjective $properNoun, $region\'s $otherNoun$mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$adjective $properNoun of $otherNoun, the $profession $mainNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $adjective, $adjective and $adjective',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $otherNoun$adjective of $region',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $otherNoun$profession of $region',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $adjective $profession of $region',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$otherNoun$adjective $properNoun, the $profession',
  },
];

module.exports = templates;
