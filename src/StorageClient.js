import { InternalError } from 'json-api-error';
import get from 'lodash.get';
import queryString from 'querystring';
import ServiceClientFactory from './ServiceClientFactory';
import { normalizeDocument, normalizeErrorResponse } from './helpers';

class StorageClient {
  constructor() {
    this.storageClient = new ServiceClientFactory({
        name: 'storage-service'
    })
  }

  async create(doc) {
    let response;
    
    try {
      const res = await this.storageClient.request({
        url: '/documents',
        method: 'POST',
        data: {
          data: {
            id: get(doc, 'Id'),
            type: 'documents',
            attributes: {
                Path: get(doc, 'Path'),
                Content: get(doc, 'Content'),
                Attributes: get(doc, 'Attributes'),
                Type: get(doc, 'Type'),
            }
          }
        }
      });

      response = {
        statusCode: res.status,
        body: normalizeDocument(res.data.data),
        headers: res.headers,
      }
    } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          response = normalizeErrorResponse(err.response);
        } else {
          console.log('Error in creating document.', err);

          throw new InternalError('Error in creating document.');
        }
      }

    return response;
  }

  async get(Id) {
    let response;
    
    try {
      const res = await this.storageClient.request({
        url: `/documents/${Id}`,
        method: 'GET',
      });

      response = {
        statusCode: res.status,
        body: normalizeDocument(res.data),
        headers: res.headers,
      }
    } catch (err) {
      if (err.response) {
        response = normalizeErrorResponse(err.response);
      } else {
        console.log('Error in getting document.', err);

        throw new InternalError('Error in creating document.');
      }
    }

    return response;
  }

  async list(options) {
    let response;
    
    let q = queryString.stringify({
      query: get(options, 'query'),
      sort: get(options, 'sort'),
      skip: get(options, 'skip'),
      limit: get(options, 'limit'),
    });

    try {
      const res = await this.storageClient.request({
        url: `/documents?${q}`,
        method: 'GET',
      });
      
      response = {
        statusCode: res.status,
        body: res.data.data.map(doc => normalizeDocument(doc)),
        headers: res.headers,
      }
    } catch (err) {
        if (err.response) {
          response = normalizeErrorResponse(err.response);
        } else {
          console.log('Error in listing document.', err);

          throw new InternalError('Error in listing document.');
        }
      }

    return response;
  }

  async update(Id, doc) {
    let response;
    
    try {
      const res = await this.storageClient.request({
        url: `/documents/${Id}`,
        method: 'PATCH',
        data: {
          data: {
            id: get(doc, 'Id'),
            type: 'documents',
            attributes: {
              Content: get(doc, 'Content'),
              Attributes: get(doc, 'Attributes'),
              Type: get(doc, 'Type'),
            }
          }
        }
      });
      
      response = {
        statusCode: res.status,
        body: normalizeDocument(res.data.data),
        headers: res.headers,
      }
    } catch (err) {
      if (err.response) {
        response = normalizeErrorResponse(err.response);
      } else {
        console.log('Error in updating document.', err);

        throw new InternalError('Error in updating document.');
      }
    }

    return response;
  }

  async delete(Id) {
    let response;
    
    try {
      const res = await this.storageClient.request({
        url: `/documents/${Id}`,
        method: 'DELETE',
      });
      
      response = {
        statusCode: res.status,
        body: res.data,
        headers: res.headers,
      }
    } catch (err) {
      if (err.response) {
        response = normalizeErrorResponse(err.response);
      } else {
        console.log('Error in deleting document.', err);

        throw new InternalError('Error in deleting document.');
      }
    }

    return response;
  }
}

export default StorageClient;