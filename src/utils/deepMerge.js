function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}

function deepMerge(mainObject, objectToMerge) {
    const mergedObject = { ...mainObject };
    for (const key in objectToMerge) {
        if (isObject(objectToMerge[key])) {
            mergedObject[key] = deepMerge(mergedObject[key], objectToMerge[key]);
        } else {
            mergedObject[key] = objectToMerge[key];
        }
    }
    return mergedObject;
}

module.exports = deepMerge;
