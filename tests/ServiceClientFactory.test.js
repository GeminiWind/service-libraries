import nock from 'nock';
import ServiceClientFactory from '../src/ServiceClientFactory';

describe('ServiceClientFactory', () => {
  afterEach(() => {
    nock.restore();
  });

  it('can get "storageServiceClient"', async () => {
    nock('http://registry-service:3000')
      .get('/services/storage-service')
      .reply(200, {
        data: {
          type: 'services',
          attributes: {
            endpoint: 'http://storage-service:3001',
          },
        },
      });


    const storageServiceClient = new ServiceClientFactory({
      name: 'storage-service',
    });

    expect(storageServiceClient.request).toBeInstanceOf(Function);
  });
});
