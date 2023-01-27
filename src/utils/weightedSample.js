function getItemWeight(item) {
  if (typeof item !== 'object' || !Object.hasOwnProperty.call(item, 'weight')) {
    return 1;
  }

  return item.weight;
}

function weightedSample(collection, filters) {
  let collectionType = typeof collection;
  if (collection instanceof Array) collectionType = 'array';

  if (collectionType !== 'array' && collectionType !== 'object') {
    throw new Error(`Weighted sample expects an array or object but has received: ${collectionType}`);
  }

  if (
    filters !== undefined
    && typeof filters !== 'function'
    && (
      !(filters instanceof Array)
      || filters.some((filter) => typeof filter !== 'function')
    )
  ) {
    throw new Error('Expected second argument to be a function or an array of functions');
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
        || !Object.hasOwnProperty.call(item, 'weight')
        || item.weight > 0);

  if (collectionData.length <= 0) {
    throw new Error('The received collection has no data with positive weights');
  }

  // Apply filters
  if (filters) {
    const filtersArray = typeof filters === 'function' ? [filters] : filters;
    filtersArray.forEach((filter) => {
      collectionData = collectionData.filter(filter);
    });
  }

  // Calculate the weight sum
  let maxWeight = collectionData.reduce((total, item) => total + getItemWeight(item), 0);
  const randomMark = Math.random() * maxWeight;

  const result = collectionData.find((item) => {
    const itemWeight = getItemWeight(item);
    maxWeight -= itemWeight;
    return randomMark > maxWeight;
  });

  return result;
}

module.exports = weightedSample;
