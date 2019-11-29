# **Service Libraries**

A collection of utilities for services in [mircoservice-poc](https://github.com/GeminiWind/microservice-poc)

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

const response = await serviceClient.request(config)
```

##### ServiceClientFactory API

**serviceClient.request(config)**

```javascript
    // Send a POST request
    const res = await serviceClient.request({
        method: 'post',
        url: '/user/12345',
        data: {
            firstName: 'Fred',
            lastName: 'Flintstone'
    }
    });
```

This lib use axios as HTTP Client. For full config, you can see [here](https://github.com/axios/axios#request-config)

#### Middlewares

##### useStorage

`useStorage` middleware attach storage in the request to help your service using storage in the easiest way

```javascript
import { useStorage } from '@hai.dinh/service-libraries/middlewares';

...
// in your service (Express)
const app = express();

app.use(useStorage)

// extract storageClient from your request
app.get('/', (req, res) => {
    const { storageClient } = res;
})
```

**Storage Client API**

- create
```javascript
    const record = await storageClient.create(documentPath, {
        "Content": documentContent,
        "Type": documentType,
        "Attributes": documentAttributs,
    })
```
- get
```javascript
    const record = await storageClient.get(documentPath)
```
- list
```javascript
    const record = await storageClient.list(options)
```
- update
```javascript
    const record = await storageClient.update(documentPath, {
        "Content": documentContent,
        "Type": documentType,
        "Attributes": documentAttributs,
    })
```
- delete
```javascript
    const record = await storageClient.delete(documentPath)
```

## TODOS

- [] Writing test