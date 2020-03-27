import nock from 'nock';
import mockFs from 'mock-fs';
import { NotFoundError } from 'json-api-error';
import ServiceClientFactory from '../src/ServiceClientFactory';

describe('ServiceClientFactory', () => {
  jest.mock('../src/logger', () => ({
    error: jest.fn(),
  }));

  afterEach(() => {
    mockFs.restore();
    nock.restore();
  });

  it('can execute request to targeted service correctly', async () => {
    mockFs({
      'service-env.json': JSON.stringify({
        id: 'order-service',
        name: 'order service',
        dependencies: [{
          id: 'storage-service',
          name: 'storage service',
          category: 'storage',
          endpoint: 'http://storage-service:3000',
          version: '1.0.0',
        }],
      }),
    });

    nock('http://storage-service:3000')
      .get('/healthz')
      .reply(200, {
        ping: 'pong',
      });

    const storageServiceClient = await ServiceClientFactory.create('storage-service');

    const response = await storageServiceClient.request({
      method: 'get',
      url: '/healthz',
    });

    expect(response.status).toBe(200);
  });

  it('throw NotFoundError if the target was not found', async () => {
    mockFs({
      'service-env.json': JSON.stringify({
        id: 'order-service',
        name: 'order service',
        dependencies: [{
          id: 'storage-service',
          name: 'storage service',
          category: 'storage',
          endpoint: 'http://storage-service:3000',
          version: '1.0.0',
        }],
      }),
    });

    const orderServiceClient = await ServiceClientFactory.create('order-service');

    let error;

    try {
      await orderServiceClient.request({
        method: 'get',
        url: '/healthz',
      });
    } catch (err) {
      error = err;
    }

    expect(error).toBeInstanceOf(NotFoundError);
  });
});
