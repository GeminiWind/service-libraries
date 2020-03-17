import fs from 'fs';
import { promisify } from 'util';
import logger, { httpLogger } from '../src/logger';

const sleep = promisify(setTimeout);

const removeFile = (filename) => {
  try {
    fs.unlinkSync(filename);
  } catch (e) {
    // let's pretend this never happened
  }
};

const emptyFile = (filename) => {
  try {
    fs.writeFileSync(filename, '');
  } catch (e) {
    // let's pretend this never happened
  }
};


describe('logger', () => {
  afterAll(() => {
    removeFile('log/app.log');
    removeFile('log/errors.log');
  });

  it('should log error level correctly with X-Request-ID is available', async () => {
    process.env['X-Request-ID'] = '123';
    logger.error('Oops! Something went wrong');
    await sleep(1000);

    const content = fs.readFileSync('log/app.log').toString();

    expect(content).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}] \[ERROR] 123 - Oops! Something went wrong/);

    delete process.env['X-Request-ID'];
    emptyFile('log/app.log');
    emptyFile('log/errors.log');
  });

  it('should log error level correctly with X-Request-ID is not available', async () => {
    delete process.env['X-Request-ID'];
    logger.error('Oops! Something went wrong');
    await sleep(1000);

    const content = fs.readFileSync('log/app.log').toString();

    expect(content).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}] \[ERROR] - - Oops! Something went wrong/);

    emptyFile('log/app.log');
    emptyFile('log/errors.log');
  });

  it('should log warn level correctly with X-Request-ID is available', async () => {
    process.env['X-Request-ID'] = '123';
    logger.warn('Warning');

    await sleep(1000);

    const content = fs.readFileSync('log/app.log').toString();

    expect(content).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}] \[WARN] 123 - Warning/);

    delete process.env['X-Request-ID'];
    emptyFile('log/app.log');
  });

  it('should log warn level correctly with X-Request-ID is not available', async () => {
    delete process.env['X-Request-ID'];
    logger.warn('Warning');

    await sleep(1000);

    const content = fs.readFileSync('log/app.log').toString();

    expect(content).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}] \[WARN] - - Warning/);

    emptyFile('log/app.log');
  });

  it('should log info level correctly with X-Request-ID is available', async () => {
    process.env['X-Request-ID'] = '123';
    logger.info('Your account has started subscribe gold plan');

    await sleep(1000);

    const content = fs.readFileSync('log/app.log').toString();

    expect(content).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}] \[INFO] 123 - Your account has started subscribe gold plan/);

    delete process.env['X-Request-ID'];
    emptyFile('log/app.log');
  });

  it('should log info level correctly with X-Request-ID is not available', async () => {
    delete process.env['X-Request-ID'];
    logger.info('Your account has started subscribe gold plan');

    await sleep(1000);

    const content = fs.readFileSync('log/app.log').toString();

    expect(content).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}] \[INFO] - - Your account has started subscribe gold plan/);

    emptyFile('log/app.log');
  });
});

describe('httpLogger', () => {
  afterAll(() => {
    removeFile('log/access.log');
  });

  it('should log error level correctly', async () => {
    httpLogger.error('Oops! Something went wrong');

    await sleep(1000);

    const content = fs.readFileSync('log/access.log').toString();

    expect(content).toMatch(/Oops! Something went wrong/);

    emptyFile('log/access.log');
  });

  it('should log warn level correctly', async () => {
    httpLogger.warn('Warning');

    await sleep(1000);

    const content = fs.readFileSync('log/access.log').toString();

    expect(content).toMatch(/Warning/);

    emptyFile('log/access.log');
  });

  it('should log info level correctly', async () => {
    httpLogger.info('Your account has started subscribe gold plan');

    await sleep(1000);

    const content = fs.readFileSync('log/access.log').toString();

    expect(content).toMatch(/Your account has started subscribe gold plan/);

    emptyFile('log/access.log');
  });
});
