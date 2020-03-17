import * as R from 'ramda';
import { InternalError } from 'json-api-error';
import axios from 'axios';

const patchHeaders = R.pipe(
  r => R.pathOr({}, ['headers'], r),
  headers => R.mergeRight(headers, {
    ...(process.env['X-Request-ID'] ? { 'X-Request-Id': process.env['X-Request-ID'] } : {}),
  }),
  headers => R.mergeLeft(headers, {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
  }),
);

class ServiceClientFactory {
  constructor({ name }) {
    this.name = name;
    // TODO: load endpoint based on environment (dev, qa, staging, prod)
    this.serviceRegistryEndpoint = 'http://registry-service:3000';
  }

  async request(config) {
    let response;

    try {
      response = await axios.get(`${this.serviceRegistryEndpoint}/services/${this.name}`);
    } catch (err) {
      throw new InternalError('Error in getting service endpoint');
    }

    const {
      data: {
        data: {
          attributes: {
            endpoint: serviceEndpoint,
          },
        },
      },
    } = response;

    return axios({
      ...config,
      headers: patchHeaders(config),
      baseURL: serviceEndpoint,
    });
  }
}

export default ServiceClientFactory;
