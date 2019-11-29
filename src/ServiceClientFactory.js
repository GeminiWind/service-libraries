import { InternalError } from 'json-api-error';
import axios from 'axios';

class ServiceClientFactory {
  constructor({ name }) {
    this.name = name;
    // TODO: load endpoint based on environment (dev, qa, staging, prod)
    this.serviceRegistryEndpoint = 'http://localhost:3000';
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
      baseURL: serviceEndpoint,
    });
  }
}

export default ServiceClientFactory;
