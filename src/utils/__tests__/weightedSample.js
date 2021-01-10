const weightedSample = require('../weightedSample');

describe('Weighted sample util', () => {
  const basicArray = [4, 1, 6, 9];
  const zeroChanceArray = [
    {
      chance: 0,
    },
    {
      chance: 0,
    },
  ];
  const oneChanceArray = [
    {
      chance: 0,
    },
    {
      chance: 1,
    },
  ];
  const basicObject = {
    a: 5,
    b: 3,
    c: 8,
  };
  const zeroChanceObject = {
    a: {
      chance: 0,
    },
    b: {
      chance: 0,
    },
  };
  const oneChanceObject = {
    c: {
      chance: 0,
    },
    d: {
      chance: 1,
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

  it('Should return an item from an array', () => {
    const sample = weightedSample(basicArray);
    expect(basicArray).toContain(sample);
  });

  it('Should return an item from an object', () => {
    const sample = weightedSample(basicObject);
    expect([5, 3, 8]).toContain(sample);
  });

  it('Should return the expected item from an array with only one positive chance', () => {
    const sample = weightedSample(oneChanceArray);
    expect(sample).toEqual({
      chance: 1,
    });
  });

  it('Should return the expected item from an object with only one positive chance', () => {
    const sample = weightedSample(oneChanceObject);
    expect(sample).toHaveProperty('chance', 1);
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

  it('Should return an error if an array with zero chances is provided', () => {
    expect(() => {
      weightedSample(zeroChanceArray);
    }).toThrow();
  });

  it('Should return an error if an object with zero chances is provided', () => {
    expect(() => {
      weightedSample(zeroChanceObject);
    }).toThrow();
  });
});
