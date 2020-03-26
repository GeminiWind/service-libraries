import * as R from 'ramda';
import { NotFoundError } from 'json-api-error';
import axios from 'axios';
import { readJsonAtRoot } from './helpers';

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
  constructor(id) {
    this.id = id;
    this.serviceEnv = undefined;
  }

  setServiceEnv(serviceEnv) {
    this.serviceEnv = serviceEnv;
  }

  async request(config) {
    const resolvedDependencies = R.pathOr([], ['dependencies'], this.serviceEnv);
    const target = R.find(R.propEq('id', this.id))(resolvedDependencies);

    if (!target) {
      throw new NotFoundError(`Service with id: "${this.id}" was not found`);
    }

    return axios({
      ...config,
      headers: patchHeaders(config),
      baseURL: target.endpoint,
    });
  }

  static async create(id) {
    const serviceEnv = await readJsonAtRoot('service-env.json');

    const serviceClientFactory = new ServiceClientFactory(id);
    serviceClientFactory.setServiceEnv(serviceEnv);

    return serviceClientFactory;
  }
}

export default ServiceClientFactory;
