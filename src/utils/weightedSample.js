function getItemChance(item) {
  if (typeof item !== 'object' || !Object.hasOwnProperty.call(item, 'chance')) {
    return 1;
  }

  return item.chance;
}

function weightedSample(collection) {
  let collectionType = typeof collection;
  if (collection instanceof Array) collectionType = 'array';

  if (collectionType !== 'array' && collectionType !== 'object') {
    throw new Error(`Weighted sample expects an array or object but has received: ${collectionType}`);
  }

  // Assign the key property if the collection is an object
  let collectionData = collection;
  if (collectionType === 'object') {
    collectionData = Object.entries(collection).map(([key, value]) => {
      if (typeof value === 'object') {
        return {
          key,
          ...value,
        };
      }
      return value;
    });
  }

  // Remove items with no chance of appearing
  collectionData = collectionData.filter((item) => typeof item !== 'object'
        || !Object.hasOwnProperty.call(item, 'chance')
        || item.chance > 0);

  if (collectionData.length <= 0) {
    throw new Error('The received collection has no data with positive chances');
  }

  // Calculate the weight sum
  let maxWeight = collectionData.reduce((total, item) => total + getItemChance(item), 0);
  const randomMark = Math.random() * maxWeight;

  const result = collectionData.find((item) => {
    const itemChance = getItemChance(item);
    maxWeight -= itemChance;
    return randomMark > maxWeight;
  });

  return result;
}

module.exports = weightedSample;