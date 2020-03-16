import httpHandler from '../src/httpHandler';

describe('httpHandler', () => {
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

  it('return correct response with no response headers was set', async () => {
    const handler = request => ({
      statusCode: 200,
      body: {
        userId: request.params.userId,
      },
    });

    const transformer = httpHandler(handler);

    await transformer(req, res, next);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.set.mock.calls[0][0]).toStrictEqual({ Accept: 'application/vnd.api+json', 'Content-Type': 'application/vnd.api+json' });
    expect(res.json.mock.calls[0][0]).toStrictEqual({
      userId: req.params.userId,
    });
  });

  it('return correct response with Accept & Content-Type response header was override default value', async () => {
    const handler = request => ({
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      statusCode: 200,
      body: {
        userId: request.params.userId,
      },
    });

    const transformer = httpHandler(handler);

    await transformer(req, res, next);

    expect(res.status.mock.calls[0][0]).toBe(200);
    expect(res.set.mock.calls[0][0]).toStrictEqual({ Accept: 'application/json', 'Content-Type': 'application/json' });
    expect(res.json.mock.calls[0][0]).toStrictEqual({
      userId: req.params.userId,
    });
  });

  it('send error to "next" function if it encounter any error in processing handler', async () => {
    const handler = () => { throw new Error('Oops! Something went wrong'); };

    const transformer = httpHandler(handler);

    await transformer(req, res, next);

    expect(next.mock.calls.length).toBe(1);
  });
});
