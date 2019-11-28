# **Service Libraries**

A collection of utilities for services in mircoservice-poc

## Getting Started

### Installation
The easiest way to install `service-libraries` is using NPM. If you have Node.js installed, it is most likely that you have NPM installed as well.

```
$ npm install @hai.dinh/service-libraries
```

### Usage

#### ServiceClientFactory

`ServiceClientFactory` acts as service discovery in microservice system. To use this, do the following:

```javascript
import { ServiceClientFactory } from '@hai.dinh/service-libraries';

...

const serviceClient = new ServiceClientFactory({
    name: <registered-service-name>
});

const response = await serviceClient.request({
    url: '/authors',
    method: 'GET'
})
```

The response is instance of Axios response, then you can manipulate the response 

#### Middlewares

##### useStorage

`useStorage` middleware attach storage in the request to help your service using storage in the easiest way

```javascript
import { useStorage } from '@hai.dinh/service-libraries/middlewares';

...
// in your service (Express)
const app = express();

app.use(useStorage)
```

## TODOS

- [] Writing test