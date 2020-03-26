import nock from 'nock';
import mockFs from 'mock-fs';
import ServiceClientFactory from '../src/ServiceClientFactory';

describe('ServiceClientFactory', () => {
  beforeAll(() => {
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
  });

  afterEach(() => {
    mockFs.restore();
  });

  afterEach(() => {
    nock.restore();
  });

  it('can execute request to targeted service correctly', async () => {
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
});
