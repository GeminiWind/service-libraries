import { useInstrumentation } from '../../src/middlewares';

describe('useInstrumentation', () => {
  const req = {
    headers: {
      accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json',
    },
    params: {
      userId: 1,
    },
  };

  const res = {
    set: jest.fn().mockImplementation(function () { return this; }),
    status: jest.fn().mockImplementation(function () { return this; }),
    json: jest.fn().mockImplementation(function () { return this; }),
  };

  const next = jest.fn().mockImplementation(error => error);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should attach "instrumentation" in the request', async () => {
    useInstrumentation(req, res, next);

    expect(req.instrumentation).toBeDefined();
    expect(next.mock.calls.length).toBe(1);
  });
});
