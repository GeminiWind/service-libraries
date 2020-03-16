import fs from 'fs';
import { promisify } from 'util';
import logger from '../src/logger';

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

  it('should log error level correctly', async () => {
    logger.error('Oops! Something went wrong');

    await sleep(1000);

    const content = fs.readFileSync('log/app.log').toString();

    expect(content).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}] \[ERROR] default - Oops! Something went wrong/);

    emptyFile('log/app.log');
    emptyFile('log/errors.log');
  });

  it('should log warn level correctly', async () => {
    logger.warn('Warning');

    await sleep(1000);

    const content = fs.readFileSync('log/app.log').toString();

    expect(content).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}] \[WARN] default - Warning/);

    emptyFile('log/app.log');
  });

  it('should log info level correctly', async () => {
    logger.info('Your account has started subscribe gold plan');

    await sleep(1000);

    const content = fs.readFileSync('log/app.log').toString();

    expect(content).toMatch(/\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}] \[INFO] default - Your account has started subscribe gold plan/);

    emptyFile('log/app.log');
  });
});
