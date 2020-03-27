import * as R from 'ramda';
import rootDir from 'app-root-dir';
import { InternalError } from 'json-api-error';
import fs from 'fs-extra';
import path from 'path';
import { promisify } from 'util';
import logger from '../logger';

const readJsonAsync = promisify(fs.readJSON);

const dir = rootDir.get();

const readJsonAtRoot = R.pipeP(
  relativePath => Promise.resolve(path.resolve(dir, relativePath)),
  async (absolutePath) => {
    let result;

    try {
      result = await readJsonAsync(absolutePath);
    } catch (err) {
      logger.error('Error in reading file service-env.json', err);

      throw new InternalError('Error in reading file service-env.json');
    }

    return result;
  },
);

export default readJsonAtRoot;
