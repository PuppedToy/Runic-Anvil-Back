const weightedSample = require('../weightedSample');

describe('Weighted sample util', () => {
  const basicArray = [4, 1, 6, 9];
  const zeroWeightArray = [
    {
      weight: 0,
    },
    {
      weight: 0,
    },
  ];
  const oneWeightArray = [
    {
      weight: 0,
    },
    {
      weight: 1,
    },
  ];
  const basicObject = {
    a: 5,
    b: 3,
    c: 8,
  };
  const zeroWeightObject = {
    a: {
      weight: 0,
    },
    b: {
      weight: 0,
    },
  };
  const oneWeightObject = {
    c: {
      weight: 0,
    },
    d: {
      weight: 1,
    },
  };
  const keyableObject = {
    foo: {
      a: 3,
    },
    bar: {
      b: 5,
    },
  };
  const keyableArray = [
    {
      a: 3,
    },
    {
      b: 5,
    },
  ];
  const keyableKeyedObject = {
    foo: {
      a: 3,
      key: 'fookey',
    },
    bar: {
      b: 5,
      key: 'fookey',
    },
  };
  const filterableArray = ['foo', 'bar', 'baz'];
  const filterableObject = {
    foo: 'bar',
    bar: 'baz',
  };

  it('Should return an item from an array', () => {
    const sample = weightedSample(basicArray);
    expect(basicArray).toContain(sample);
  });

  it('Should return an item from an object', () => {
    const sample = weightedSample(basicObject);
    expect([5, 3, 8]).toContain(sample);
  });

  it('Should return the expected item from an array with only one positive weight', () => {
    const sample = weightedSample(oneWeightArray);
    expect(sample).toEqual({
      weight: 1,
    });
  });

  it('Should return the expected item from an object with only one positive weight', () => {
    const sample = weightedSample(oneWeightObject);
    expect(sample).toHaveProperty('weight', 1);
  });

  it('Should return an object with the key property when object of objects is provided', () => {
    const sample = weightedSample(keyableObject);
    expect(sample).toHaveProperty('key');

    const { key } = sample;
    expect(['foo', 'bar']).toContain(key);
  });

  it('Should return an object without the key property when array of objects is provided', () => {
    const sample = weightedSample(keyableArray);
    expect(sample).not.toHaveProperty('key');
  });

  it('Should not override the key property', () => {
    const sample = weightedSample(keyableKeyedObject);
    expect(sample).toHaveProperty('key', 'fookey');
  });

  it('Should not return the expected result if one filter is applied to an object', () => {
    const filter = (item) => item === 'bar';

    const sample = weightedSample(filterableObject, filter);
    expect(sample).toBe('bar');
  });

  it('Should not return the expected result if two filters are applied to an object', () => {
    const filters = [
      (item) => item.match(/ba./),
      (item) => item.match(/.ar/),
    ];

    const sample = weightedSample(filterableObject, filters);
    expect(sample).toBe('bar');
  });

  it('Should not return the expected result if one filter is applied to an array', () => {
    const filter = (item) => item === 'bar';

    const sample = weightedSample(filterableArray, filter);
    expect(sample).toBe('bar');
  });

  it('Should not return the expected result if two filters are appied to an array', () => {
    const filters = [
      (item) => item.match(/ba./),
      (item) => item.match(/.ar/),
    ];

    const sample = weightedSample(filterableArray, filters);
    expect(sample).toBe('bar');
  });

  it('Should return an error if no param is provided', () => {
    expect(() => {
      weightedSample();
    }).toThrow();
  });

  it('Should return an error if number param is provided', () => {
    expect(() => {
      weightedSample(5);
    }).toThrow();
  });

  it('Should return an error if string param is provided', () => {
    expect(() => {
      weightedSample('foo');
    }).toThrow();
  });

  it('Should return an error if boolean param is provided', () => {
    expect(() => {
      weightedSample(true);
    }).toThrow();
  });

  it('Should return an error if an array with zero weights is provided', () => {
    expect(() => {
      weightedSample(zeroWeightArray);
    }).toThrow();
  });

  it('Should return an error if an object with zero weights is provided', () => {
    expect(() => {
      weightedSample(zeroWeightObject);
    }).toThrow();
  });

  it('Should return an error if filter is a positive number', () => {
    expect(() => {
      weightedSample(oneWeightArray, 1);
    }).toThrow();
  });

  it('Should return an error if filter is a non empty string', () => {
    expect(() => {
      weightedSample(oneWeightArray, 'hello');
    }).toThrow();
  });

  it('Should not return an error if filter is undefined', () => {
    expect(() => {
      weightedSample(oneWeightArray, undefined);
    }).not.toThrow();
  });

  it('Should return an error if filter is 0', () => {
    expect(() => {
      weightedSample(oneWeightArray, 0);
    }).toThrow();
  });

  it('Should return an error if filter is null', () => {
    expect(() => {
      weightedSample(oneWeightArray, null);
    }).toThrow();
  });

  it('Should return an error if filter is an empty string', () => {
    expect(() => {
      weightedSample(oneWeightArray, '');
    }).toThrow();
  });

  it('Should return an error if filter is false', () => {
    expect(() => {
      weightedSample(oneWeightArray, false);
    }).toThrow();
  });

  it('Should not return an error if filter is an empty array', () => {
    expect(() => {
      weightedSample(oneWeightArray, []);
    }).not.toThrow();
  });

  it('Should not return an error if filter is an empty function array', () => {
    expect(() => {
      weightedSample(oneWeightArray, [() => null]);
    }).not.toThrow();
  });

  it('Should return an error if filter is an array filled with a non function item', () => {
    expect(() => {
      weightedSample(oneWeightArray, [5]);
    }).toThrow();
  });

  it('Should return an error if filter is an array containing a non function item', () => {
    expect(() => {
      weightedSample(oneWeightArray, [() => null, 5]);
    }).toThrow();
  });
});
