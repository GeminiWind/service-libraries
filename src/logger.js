import log4js from 'log4js';

log4js.configure(
  {
    pm2: true,
    disableClustering: true,
    appenders: {
      app: {
        type: 'file',
        filename: 'log/app.log',
        maxLogSize: 10 * 1024 * 1024, // = 10Mb
        backups: 5, // keep five backup files
        compress: true, // compress the backups
        encoding: 'utf-8',
        mode: 0o0640,
        flags: 'w+',
      },
      out: {
        type: 'stdout',
      },
      errorFile: {
        type: 'file',
        filename: 'log/errors.log',
        maxLogSize: 10 * 1024 * 1024, // = 10Mb
        compress: true, // compress the backups
        encoding: 'utf-8',
        mode: 0o0640,
        flags: 'w+',
      },
      errors: {
        type: 'logLevelFilter',
        level: 'ERROR',
        appender: 'errorFile',
      },
    },
    categories: {
      default: { appenders: ['app', 'errors', 'out'], level: 'INFO' },
    },
  },
);

const logger = log4js.getLogger('default');

export default logger;
