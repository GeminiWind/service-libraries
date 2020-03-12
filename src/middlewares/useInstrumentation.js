import logger from '../logger';

const useInstrumentation = (req, res, next) => {
  req.instrumentation = logger;

  next();
};

export default useInstrumentation;
