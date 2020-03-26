import mockFs from 'mock-fs';
import { readJsonAtRoot } from '../../src/helpers';


describe('readJsonAtRoot', () => {
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

  it('can read json file at root', async () => {
    const content = await readJsonAtRoot('service-env.json');

    expect(content).toStrictEqual({
      id: 'order-service',
      name: 'order service',
      dependencies: [{
        id: 'storage-service',
        name: 'storage service',
        category: 'storage',
        endpoint: 'http://storage-service:3000',
        version: '1.0.0',
      }],
    });
  });
});
