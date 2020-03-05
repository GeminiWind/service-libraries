import * as R from 'ramda';

const getHeaders = R.pipe(
  r => R.pathOr({}, ['headers'], r),
  headers => R.mergeLeft(headers, {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
  }),
);

const httpHandler = fn => async (req, res, next) => {
  try {
    const result = await fn(req);

    if (result) {
      const headers = getHeaders(result);

      res.set(headers).status(result.statusCode).json(result.body);
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default httpHandler;
