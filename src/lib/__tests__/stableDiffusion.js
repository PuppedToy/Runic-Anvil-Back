const {
  rmdirSync,
  existsSync,
  readdirSync,
  writeFileSync,
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
  getQueueLength,
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
      query = {
        status: 'STARTING',
        ckpt: 'foo',
        seed: 0,
        prompt: 'bar',
        quantity: 1,
      };
    });

    it('Should change a query status', () => {
      processQuery(query);
      expect(query.status).toBe('PROCESSING');
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

    // @TODO tests for the (ldm) command
  });
});
