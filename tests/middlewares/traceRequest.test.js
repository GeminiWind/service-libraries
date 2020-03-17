import { traceRequest } from '../../src/middlewares';

describe('traceRequest', () => {
  const req = {
    headers: {
      accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json',
      'x-request-id': '123456789',
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
    delete process.env['X-Request-ID'];
  });

  // FIXME: jest run test in parallel mode by default.
  // Therefore delete environment variable after each test does not work
  it.skip('should not store "X-Request-ID" in environment variable if it is not available in the request', async () => {
    traceRequest(req, res, next);

    expect(process.env['X-Request-ID']).toBeUndefined();
  });

  it('should store "X-Request-ID" in environment variable if it is available in the request', async () => {
    traceRequest(req, res, next);

    expect(process.env['X-Request-ID']).toBe('123456789');
  });
});
