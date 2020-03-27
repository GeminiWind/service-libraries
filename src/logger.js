import log4js from 'log4js';
import path from 'path';
import rootDir from 'app-root-dir';

const dir = rootDir.get();

log4js.configure(
  {
    pm2: true,
    disableClustering: true,
    appenders: {
      app: {
        type: 'file',
        filename: path.resolve(dir, './log/app.log'),
        maxLogSize: 10 * 1024 * 1024, // = 10Mb
        backups: 5, // keep five backup files
        compress: true, // compress the backups
        encoding: 'utf-8',
        mode: 0o644,
        flags: 'a',
        layout: {
          type: 'pattern',
          pattern: '[%d] [%p] %x{requestId} - %m',
          tokens: {
            requestId: () => (process.env['X-Request-ID'] ? process.env['X-Request-ID'] : '-'),
          },
        },
      },
      http: {
        type: 'file',
        filename: path.resolve(dir, './log/access.log'),
        maxLogSize: 10 * 1024 * 1024, // = 10Mb
        backups: 5, // keep five backup files
        compress: true, // compress the backups
        encoding: 'utf-8',
        mode: 0o644,
        flags: 'a',
        layout: {
          type: 'messagePassThrough',
        },
      },
      httpStdout: {
        type: 'stdout',
        layout: {
          type: 'messagePassThrough',
        },
      },
      out: {
        type: 'stdout',
        layout: {
          type: 'pattern',
          pattern: '[%d] [%p] %x{requestId} - %m',
          tokens: {
            requestId: () => (process.env['X-Request-ID'] ? process.env['X-Request-ID'] : '-'),
          },
        },
      },
      errorFile: {
        type: 'file',
        filename: 'log/errors.log',
        maxLogSize: 10 * 1024 * 1024, // = 10Mb
        compress: true, // compress the backups
        encoding: 'utf-8',
        mode: 0o644,
        flags: 'a',
      },
      errors: {
        type: 'logLevelFilter',
        level: 'ERROR',
        appender: 'errorFile',
      },
    },
    categories: {
      default: { appenders: ['app', 'errors', 'out'], level: 'INFO' },
      http: { appenders: ['http', 'httpStdout'], level: 'INFO' },
    },
  },
);

const logger = log4js.getLogger('default');

const httpLogger = log4js.getLogger('http');

export { httpLogger };

export default logger;
