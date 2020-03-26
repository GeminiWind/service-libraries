import nock from 'nock';
import mockFs from 'mock-fs';
import StorageClient from '../src/StorageClient';

describe('StorageClient', () => {
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

  afterAll(() => {
    mockFs.restore();
  });

  afterEach(() => {
    nock.restore();
  });

  it('can create document successfully', async () => {
    nock('http://storage-service:3000')
      .post('/documents')
      .reply(201, {
        data: {
          id: 1,
          type: 'documents',
          attributes: {
            Path: 'students/haidv7',
            Content: {
              name: 'haidv7',
            },
            Type: 'students',
            Attributes: {
              CreatedAt: '7:00',
            },
          },
        },
      });

    const storageServiceClient = await StorageClient.create();

    const response = await storageServiceClient.create('students/haidv7', {
      Content: {
        name: 'haidv7',
      },
      Type: 'students',
      Attributes: {
        CreatedAt: '7:00',
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.body).toStrictEqual({
      Id: 1,
      Path: 'students/haidv7',
      Content: {
        name: 'haidv7',
      },
      Type: 'students',
      Attributes: {
        CreatedAt: '7:00',
      },
    });
  });

  it.skip('can return correct error if it fails to create new document', async () => {
    nock('http://storage-service:3000')
      .post('/documents')
      .reply(400, {
        data: {
          errors: [{
            id: 'BadRequestError',
            code: 'BadRequestError',
            status: '400',
            title: 'BadRequestError',
            detail: 'BadRequestError',
          }],
        },
      });

    const storageServiceClient = await StorageClient.create();

    const response = await storageServiceClient.create('students/haidv7', {
      Content: {
        name: 'haidv7',
      },
      Type: 'students',
      Attributes: {
        CreatedAt: '7:00',
      },
    });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      errors: [{
        id: 'BadRequestError',
        code: 'BadRequestError',
        status: '400',
        title: 'BadRequestError',
        detail: 'BadRequestError',
      }],
    });
  });

  it.skip('can get document successfully', async () => {
    nock('http://storage-service:3000')
      .get('/documents')
      .reply(200, {
        data: {
          id: 1,
          type: 'documents',
          attributes: {
            Path: 'students/haidv7',
            Content: {
              name: 'haidv7',
            },
            Type: 'students',
            Attributes: {
              CreatedAt: '7:00',
            },
          },
        },
      });

    const storageServiceClient = await StorageClient.create();

    const response = await storageServiceClient.get('students/haidv7');

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      Id: 1,
      Path: 'students/haidv7',
      Content: {
        name: 'haidv7',
      },
      Type: 'students',
      Attributes: {
        CreatedAt: '7:00',
      },
    });
  });
});
