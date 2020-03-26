import * as R from 'ramda';
import rootDir from 'app-root-dir';
import fs from 'fs-extra';
import path from 'path';
import { promisify } from 'util';

const readJsonAsync = promisify(fs.readJSON);

const dir = rootDir.get();

const readJsonAtRoot = R.pipeP(
  relativePath => Promise.resolve(path.resolve(dir, relativePath)),
  absolutePath => readJsonAsync(absolutePath),
);

export default readJsonAtRoot;
