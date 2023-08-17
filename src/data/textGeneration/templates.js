const templates = [
  {
    type: 'unit',
    forgeLevel: 1,
    value: '$adjective $main',
  },
  {
    type: 'unit',
    forgeLevel: 1,
    value: '$adjective $profession',
  },
  {
    type: 'unit',
    forgeLevel: 1,
    value: '$profession $main',
  },
  {
    type: 'unit',
    forgeLevel: 1,
    value: '$main, $profession',
  },
  {
    type: 'unit',
    forgeLevel: 1,
    value: '$main of $other',
  },
  {
    type: 'unit',
    forgeLevel: 1,
    value: '$profession of $other',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$adjective $main in $region',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$adjective $profession of $other',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$adjective $profession $main',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$adjective $profession in $region',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$profession of $other and $other',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$adjective $main of $other',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$profession $main of $other',
  },
  {
    type: 'unit',
    forgeLevel: 2,
    value: '$adjective $main, $profession',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$main of the $adjective $other',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$adjective and $adjective $main',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$main-$main of $other',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$main for the $adjective $other',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$profession-$profession $main',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$profession for the $adjective',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$main of $region',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$profession of $region',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$region\'s $main',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$profession of the $adjective',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$adjective $other$profession',
  },
  {
    type: 'unit',
    forgeLevel: 3,
    value: '$other$profession $main',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$profession-$profession of $region',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$other$profession of $region',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$adjective $other$profession of $region',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$region\'s $adjective $other$profession',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$other$profession $profession',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$adjective $other$profession',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$other-$other $main',
  },
  {
    type: 'unit',
    forgeLevel: 4,
    value: '$profession and $profession $main',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $profession of the $other $professions',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $main-$main',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $other$main',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $other$profession',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $adjective $main-$main',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $adjective $other$main',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $adjective $other$profession',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $region\'s $adjective $other$profession',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $adjective-$adjective $main of $region',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $adjective $profession of $properNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $region\'s $other $profession',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $main of $other and $other',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$adjective $other$main $properNoun',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun the $other$adjective',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$adjective $properNoun, $region\'s $other$main',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $other $main',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $other $adjective',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $region\'s $profession',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$adjective and $adjective $properNoun, $region\'s $other$main',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$adjective $properNoun of $other, the $profession $main',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $adjective, $adjective and $adjective',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, the $other$adjective of $region',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $other$profession of $region',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$properNoun, $adjective $profession of $region',
  },
  {
    type: 'unit',
    forgeLevel: 5,
    value: '$other$adjective $properNoun, the $profession',
  },
];

module.exports = templates;
