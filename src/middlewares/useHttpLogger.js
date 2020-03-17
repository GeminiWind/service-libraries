import log4js from 'log4js';
import moment from 'moment-strftime';
import { httpLogger } from '../logger';

const useHttpLogger = log4js.connectLogger(httpLogger, {
  level: 'auto',
  format: (req, res, format) => format(`:remote-addr - ${req.headers['x-remote-user'] ? req.headers['x-remote-user'] : '-'} [${moment().strftime('%d/%b/%Y:%H:%M:%S %z')}]  ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"`),
});

export default useHttpLogger;
