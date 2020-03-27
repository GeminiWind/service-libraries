import { InternalError } from 'json-api-error';
import get from 'lodash.get';
import qs from 'qs';
import * as R from 'ramda';
import ServiceClientFactory from './ServiceClientFactory';
import logger from './logger';
import { normalizeDocument, normalizeErrorResponse } from './helpers';

class StorageClient {
  constructor(storageServiceClient) {
    this.storageServiceClient = storageServiceClient;
  }

  static async create(id = 'storage-service') {
    const storageServiceClient = await ServiceClientFactory.create(id);

    return new StorageClient(storageServiceClient);
  }

  async create(Path, doc) {
    let response;

    try {
      const res = await this.storageServiceClient.request({
        url: '/documents',
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
        data: {
          data: {
            type: 'documents',
            attributes: {
              Path,
              Content: get(doc, 'Content'),
              Attributes: get(doc, 'Attributes'),
              Type: get(doc, 'Type'),
            },
          },
        },
      });

      response = {
        statusCode: res.status,
        body: normalizeDocument(res.data.data),
        headers: res.headers,
      };
    } catch (err) {
      if (err.response) {
        response = normalizeErrorResponse(err.response);
      } else {
        logger.error('Error in creating document.', err);

        throw new InternalError('Error in creating document.');
      }
    }

    return response;
  }

  async get(Path) {
    let response;

    try {
      const res = await this.storageServiceClient.request({
        url: `/documents/${Path}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
      });

      response = {
        statusCode: res.status,
        body: normalizeDocument(res.data),
        headers: res.headers,
      };
    } catch (err) {
      if (err.response) {
        response = normalizeErrorResponse(err.response);
      } else {
        logger.error('Error in getting document.', err);

        throw new InternalError('Error in creating document.');
      }
    }

    return response;
  }

  async list(options) {
    let response;

    const query = R.pipe(
      JSON.stringify,
      encodeURIComponent,
    )(R.pathOr({}, ['query'], options));

    const q = qs.stringify({
      query,
      sort: get('sort', options),
      skip: R.pathOr(0, ['skip'], options),
      limit: R.pathOr(100, ['limit'], options),
    });

    try {
      const res = await this.storageServiceClient.request({
        url: `/documents?${q}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
      });

      response = {
        statusCode: res.status,
        body: res.data.data.map(doc => normalizeDocument(doc)),
        headers: res.headers,
      };
    } catch (err) {
      if (err.response) {
        response = normalizeErrorResponse(err.response);
      } else {
        logger.error('Error in listing document.', err);

        throw new InternalError('Error in listing document.');
      }
    }

    return response;
  }

  async update(Path, doc) {
    let response;

    try {
      const res = await this.storageServiceClient.request({
        url: `/documents/${Path}`,
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
        data: {
          data: {
            type: 'documents',
            attributes: {
              Content: get(doc, 'Content'),
              Attributes: get(doc, 'Attributes'),
              Type: get(doc, 'Type'),
            },
          },
        },
      });

      response = {
        statusCode: res.status,
        body: normalizeDocument(res.data.data),
        headers: res.headers,
      };
    } catch (err) {
      if (err.response) {
        response = normalizeErrorResponse(err.response);
      } else {
        logger.error('Error in updating document.', err);

        throw new InternalError('Error in updating document.');
      }
    }

    return response;
  }

  async delete(Path) {
    let response;

    try {
      const res = await this.storageServiceClient.request({
        url: `/documents/${Path}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/vnd.api+json',
          Accept: 'application/vnd.api+json',
        },
      });

      response = {
        statusCode: res.status,
        body: res.data,
        headers: res.headers,
      };
    } catch (err) {
      if (err.response) {
        response = normalizeErrorResponse(err.response);
      } else {
        logger.error('Error in deleting document.', err);

        throw new InternalError('Error in deleting document.');
      }
    }

    return response;
  }
}

export default StorageClient;
