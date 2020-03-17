const traceRequest = (req, _, next) => {
  if (req.headers['x-request-id']) {
    process.env['X-Request-ID'] = req.headers['x-request-id'];
  }

  next();
};

export default traceRequest;
