const {
  rmdirSync,
  existsSync,
  readdirSync,
  writeFileSync,
  mkdirSync,
} = require('fs');

const mockStableDiffusionProcess = {
  on: jest.fn(),
  stdin: {
    write: jest.fn(),
  },
  stdout: {
    on: jest.fn(),
  },
  stderr: {
    on: jest.fn(),
  },
  kill: jest.fn(),
};
const mockSpawn = jest.fn(() => mockStableDiffusionProcess);

jest.mock('node:child_process', () => ({
  spawn: mockSpawn,
}));

const mockDebug = jest.fn();
const mockDebugError = jest.fn();
jest.mock('debug', () => jest.fn((arg) => {
  if (arg === 'stableDiffusion') {
    return mockDebug;
  }
  if (arg === 'stableDiffusion:error') {
    return mockDebugError;
  }
  throw new Error('Unexpected debug call');
}));

const expectedDirname = __dirname.replace(/(.*)[\\/]__tests__/, '$1');

const stableDiffusion = require('../stableDiffusion');

const exampleQuery = {
  status: 'STARTING',
  ckpt: 'foo',
  seed: 0,
  prompt: 'bar',
  quantity: 1,
};

const {
  getEnvPath,
  processQuery,
  cleanDirectory,
  stableDiffusionDataHandler,
  stableDiffusionErrorDataHandler,
  stableDiffusionSpawnHandler,
  stableDiffusionCloseHandler,
  requestQuery,
  getModels,
  getStatus,
  getQuery,
  getQueue,
  getCurrentQuery,
  getStableDiffusionProcess,
  start,
  end,

  commands,
} = stableDiffusion;

describe('Stable Diffusion Library', () => {
  beforeEach(() => {
    end();
    start();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Util methods', () => {
    describe('Get env path', () => {
      it('Should transform __dirname in an envpath', () => {
        expect(getEnvPath('__dirname/foo')).toBe(`${expectedDirname}/foo`);
      });

      it('Should transform __dirname in an envpath if it appears twice', () => {
        expect(getEnvPath('__dirname/__dirname/foo')).toBe(`${expectedDirname}/${expectedDirname}/foo`);
      });

      it('Should not transform if __dirname does not appear', () => {
        expect(getEnvPath('foo')).toBe('foo');
      });

      it('Should return the second argument if path is empty', () => {
        expect(getEnvPath('', 'foo')).toBe('foo');
      });
    });

    describe('Clean directory', () => {
      const testPath = `${__dirname}/../../../tmp/test`;

      it('Should remove directory files', () => {
        writeFileSync(`${testPath}/foo.txt`, 'foo');
        writeFileSync(`${testPath}/bar.txt`, 'bar');
        cleanDirectory(testPath);
        const files = readdirSync(testPath);
        expect(files.length).toBe(0);
      });

      it('Should create the path if it does not exist', () => {
        rmdirSync(testPath, { recursive: true });
        cleanDirectory(testPath);
        const exists = existsSync(testPath);
        expect(exists).toBeTruthy();
      });
    });
  });

  describe('Process Query', () => {
    let query;
    beforeEach(() => {
      query = { ...exampleQuery };
    });

    it('Should change a query status', () => {
      processQuery(query);
      expect(query.status).toBe('PROCESSING');
    });

    it('Should change the currentQuery value', () => {
      expect(getCurrentQuery()).toBe(null);
      processQuery(query);
      expect(getCurrentQuery()).toEqual(expect.objectContaining(query));
    });

    // @TODO This test is not working because I don't know how the spy method works I suppose
    // it('Should have called cleanDirectory', () => {
    //   const cleanDirectorySpy = jest.spyOn(stableDiffusion, 'cleanDirectory');
    //   processQuery(query);
    //   expect(cleanDirectorySpy).toHaveBeenCalledOnce();
    // });

    it('Should have called stableDiffusion.stdin.write', () => {
      processQuery(query);
      expect(mockStableDiffusionProcess.stdin.write).toHaveBeenCalledOnce();
    });

    it('Should have called stableDiffusion.stdin.write with the correct input', () => {
      const expectedInput = `python scripts/txt2img.py --prompt "bar" --plms --n_iter 1 --n_samples 1 --ckpt "foo" --seed 0 --outdir "${expectedDirname}/../../tmp/test"\r\n`;
      processQuery(query);
      expect(mockStableDiffusionProcess.stdin.write).toHaveBeenCalledWith(expectedInput);
    });
  });

  describe('Stable Diffusion Data Handler', () => {
    it('Should not call write with an unexpected input', () => {
      const inputData = 'foo';
      stableDiffusionDataHandler(inputData);
      expect(mockStableDiffusionProcess.stdin.write).not.toHaveBeenCalled();
    });

    it('Should not change status with an unexpected input', () => {
      const inputData = 'foo';
      const previousStatus = stableDiffusion.getStatus();
      stableDiffusionDataHandler(inputData);
      const currentStatus = stableDiffusion.getStatus();
      expect(currentStatus).toBe(previousStatus);
    });

    it('Should call ACTIVATE command with the (base) input', () => {
      const inputData = 'foo(base)foo>foo';
      stableDiffusionDataHandler(inputData);
      expect(mockStableDiffusionProcess.stdin.write).toHaveBeenCalledWith(commands.ACTIVATE);
    });

    it('Should not change status if called with the (base) input', () => {
      const inputData = 'foo(base)foo>foo';
      const previousStatus = stableDiffusion.getStatus();
      stableDiffusionDataHandler(inputData);
      const currentStatus = stableDiffusion.getStatus();
      expect(currentStatus).toBe(previousStatus);
    });

    it('Should not call stdin if called with the (ldm) input and there is no query', () => {
      const inputData = 'foo(ldm)foo>foo';
      stableDiffusionDataHandler(inputData);
      expect(mockStableDiffusionProcess.stdin.write).not.toHaveBeenCalled();
    });

    it('Should set the IDLE status with the (ldm) input and there is no query', () => {
      const inputData = 'foo(ldm)foo>foo';
      stableDiffusionDataHandler(inputData);
      const status = getStatus();
      expect(status).toBe('IDLE');
    });

    it('Should shift the queue if there is no currentQuery and called with a queue (ldm) input and there is no query', () => {
      const elements = [
        {
          positionInQueue: 1,
          totalQueue: 3,
        },
        {
          positionInQueue: 2,
          totalQueue: 3,
        },
        {
          positionInQueue: 3,
          totalQueue: 3,
        },
      ];
      const expectedQueue = [
        {
          positionInQueue: 1,
          totalQueue: 2,
        },
        {
          positionInQueue: 2,
          totalQueue: 2,
        },
      ];
      elements.forEach((element) => {
        getQueue().push(element);
      });
      const inputData = 'foo(ldm)foo>foo';
      stableDiffusionDataHandler(inputData);
      expect(getQueue()).toEqual(expectedQueue);
    });

    it('Should change the currentQueryStatus if called with (ldm) input and there is current query', () => {
      const query = { ...exampleQuery };
      processQuery(query);
      const currentQuery = getCurrentQuery();
      const inputData = 'foo(ldm)foo>foo';
      stableDiffusionDataHandler(inputData);
      expect(currentQuery.status).toBe('DONE');
    });

    it('Should set currentQuery to null if called with (ldm) input and there is current query', () => {
      const query = { ...exampleQuery };
      processQuery(query);
      const inputData = 'foo(ldm)foo>foo';
      stableDiffusionDataHandler(inputData);
      expect(getCurrentQuery()).toBe(null);
    });

    it('Should have results if called with (ldm) input and there is current query', () => {
      const query = { ...exampleQuery, id: 1, results: [] };
      processQuery(query);
      writeFileSync(`${expectedDirname}/../../tmp/test/samples/0.png`, 'foo');
      writeFileSync(`${expectedDirname}/../../tmp/test/samples/1.png`, 'bar');
      mkdirSync(`${expectedDirname}/../../tmp/test/1`);
      const currentQuery = getCurrentQuery();
      const inputData = 'foo(ldm)foo>foo';
      stableDiffusionDataHandler(inputData);
      expect(currentQuery.results.length).toBe(2);
    });

    it('Should have empty samples directory if called with (ldm) input and there is current query', () => {
      const query = { ...exampleQuery, id: 1, results: [] };
      processQuery(query);
      writeFileSync(`${expectedDirname}/../../tmp/test/samples/0.png`, 'foo');
      writeFileSync(`${expectedDirname}/../../tmp/test/samples/1.png`, 'bar');
      mkdirSync(`${expectedDirname}/../../tmp/test/1`);
      const inputData = 'foo(ldm)foo>foo';
      stableDiffusionDataHandler(inputData);
      const samplesContents = readdirSync(`${expectedDirname}/../../tmp/test/samples`);
      expect(samplesContents.length).toBe(0);
    });

    it('Should have 2 files in FILE_DIR directory if called with (ldm) input and there is current query', () => {
      const query = { ...exampleQuery, id: 1, results: [] };
      processQuery(query);
      writeFileSync(`${expectedDirname}/../../tmp/test/samples/0.png`, 'foo');
      writeFileSync(`${expectedDirname}/../../tmp/test/samples/1.png`, 'bar');
      mkdirSync(`${expectedDirname}/../../tmp/test/1`);
      const inputData = 'foo(ldm)foo>foo';
      stableDiffusionDataHandler(inputData);
      const fileDirContents = readdirSync(`${expectedDirname}/../../tmp/test/1`);
      expect(fileDirContents.length).toBe(2);
    });
  });

  describe('Stable Diffusion Error Data Handler', () => {
    let query;
    beforeEach(() => {
      query = {
        ...exampleQuery,
        progress: {
          maxPictures: 2,
          currentPicture: 0,
          currentPicturePercentage: 0,
          totalPercentage: 0,
        },
      };
    });

    it('Should advance current image progress if message is of type PLMS Sampler', () => {
      processQuery(query);
      const message = 'foo PLMS Sampler foo 50%';
      const expectedProgress = {
        maxPictures: 2,
        currentPicture: 0,
        currentPicturePercentage: 50,
        totalPercentage: 25,
      };
      stableDiffusionErrorDataHandler(message);
      expect(getCurrentQuery().progress).toEqual(expectedProgress);
    });

    it('Should jump to next image if message is of type Sampling', () => {
      processQuery(query);
      const message = 'foo PLMS Sampling: foo 50% foo 1/2';
      const expectedProgress = {
        maxPictures: 2,
        currentPicture: 1,
        currentPicturePercentage: 0,
        totalPercentage: 50,
      };
      stableDiffusionErrorDataHandler(message);
      expect(getCurrentQuery().progress).toEqual(expectedProgress);
    });

    it('Should call debug error if message is not empty', () => {
      const message = 'foo';
      stableDiffusionErrorDataHandler(message);
      expect(mockDebugError).toHaveBeenCalledWith('foo');
    });

    it('Should not call debug error if message is empty', () => {
      const message = '';
      stableDiffusionErrorDataHandler(message);
      expect(mockDebugError).not.toHaveBeenCalled();
    });

    it('Should not call debug error if message is only white spaces', () => {
      const message = '   ';
      stableDiffusionErrorDataHandler(message);
      expect(mockDebugError).not.toHaveBeenCalled();
    });
  });
});
