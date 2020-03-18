# **Service Libraries**

[![Build Status](https://travis-ci.com/GeminiWind/service-libraries.svg?branch=master)](https://travis-ci.com/GeminiWind/service-libraries)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A collection of utilities for services in [mircoservice-poc](https://github.com/GeminiWind/microservice-poc)

## Installation
The easiest way to install `service-libraries` is using NPM. If you have Node.js installed, it is most likely that you have NPM installed as well.

```
$ npm install @hai.dinh/service-libraries
```

## Usage

### httpHandler

Being inspired by AWS Lambda response for API Gateway styling, this function retrieves your response, which being like AWS Lambda response, then transform to express response

```javascript
function simpleResponse(req) {
  return {
      statusCode: 200,
      body: {
          message: 'Hello World !'
      },
      headers: {
          'Content-Type': 'application/json'
      }
  }
}

...
import express from 'express';
import { httpHandler } from '@hai.dinh/service-libraries';

const app = express();

app.get('/hello-world', httpHandler(simpleResponse))

```

### schemaValidator

`schemaValidator` is basically instance of `ajv` (to validate data with the corresponding schema), including some basic configuration. To use `schemaValidator`, follow the instruction

```javascript
import { schemaValidator } from '@hai.dinh/service-libraries';

const validator = schemaValidator.compile(schema);
const isValid = validator(yourData);
```

### ServiceClientFactory

`ServiceClientFactory` acts as service discovery in microservice system to find the endpoint of targeted service. To use this, do the following:

```javascript
import { ServiceClientFactory } from '@hai.dinh/service-libraries';

...

const serviceClient = new ServiceClientFactory({
    name: <registered-service-name>
});

const response = await serviceClient.request(config)
```

#### ServiceClientFactory API

- serviceClient.request(config)

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
`ServiceClientFactory` uses `axios` as HTTP Client. For full config, you can get in [here](https://github.com/axios/axios#request-config).

### Middlewares

#### useStorage

`useStorage` middleware delegates `storageClient` in the request to help your service using storage in the easiest way

```javascript
import { useStorage } from '@hai.dinh/service-libraries/middlewares';

...
// in your service (Express)
const app = express();

app.use(useStorage)

// get storageClient from your request
app.get('/', (req, res) => {
    const { storageClient } = res;
})
```

##### Storage Client API

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

#### traceRequest

`traceRequest` middleware allow Express application to capture and foward `X-Request-ID` from original request headers to other services in communication to ease tracing

- Usage

```javascript
import { traceRequest } from '@hai.dinh/service-libraries/middlewares';

...
// in your service (Express)
const app = express();

app.use(traceRequest)
```

#### useInstrumentation

`useInstrumentation` provides instrumentation to support logging for application. Log will be streamed to `stdout` and saved to file `log/app.log`

```javascript
import { useInstrumentation } from '@hai.dinh/service-libraries/middlewares';

...
// in your service (Express)
const app = express();

app.use(useInstrumentation)

// get instrumentation from your request
app.get('/', (req, res) => {
    const { instrumentation } = res;
})
```

##### Instrumentation API

- trace
```javascript
instrumentation.trace('Process started!');
// Output
// If X-Request-ID is NA
// [2010-01-17 11:43:37.987] [TRACE] - - Process started!
// IF X-Request-ID is available (by useTraceRequest)
// [2010-01-17 11:43:37.987] [TRACE] 1212121 - Process started!
```
- debug
```javascript
instrumentation.debug('Got notification');
// Output
// If X-Request-ID is NA
// [2010-01-17 11:43:37.987] [DEBUG] - - Got notification!
// IF X-Request-ID is available (by useTraceRequest)
// [2010-01-17 11:43:37.987] [DEBUG] 1212121 - Got notification!
```
- info
```javascript
instrumentation.info('Hello World!');
// Output
// If X-Request-ID is NA
// [2010-01-17 11:43:37.987] [INFO] - - Hello World!
// IF X-Request-ID is available (by useTraceRequest)
// [2010-01-17 11:43:37.987] [INFO] 1212121 - Hello World!
```
- warn
```javascript
instrumentation.warn('Warn!');
// Output
// If X-Request-ID is NA
// [2010-01-17 11:43:37.987] [WARN] - - Warn!
// IF X-Request-ID is available (by useTraceRequest)
// [2010-01-17 11:43:37.987] [WARN] 121313 - Warn!
```
- error
```javascript
instrumentation.error('Error!');

// Output
// If X-Request-ID is NA
// [2010-01-17 11:43:37.987] [ERROR] - - Error!
// IF X-Request-ID is available (by useTraceRequest)
// [2010-01-17 11:43:37.987] [ERROR] 123212 - Error!
```

#### useHttpLogger

`useHttpLogger` allow your Express server to log http as CSL format.

Below is the example of log

```
127.0.0.1 - haidv@gmail.com [10/Oct/2000:13:55:36 -0700] "GET /apache_pb.gif HTTP/1.0" 200 2326 "http://referer.com" "PostmanRuntime/7.23.0" vxve23sdgs45sdvw


log-format = %(addr) %(ident) %(user) [%(ltime)] "%(method) %(uri) %(proto)" %(status) 
%(size) "%(referer)" "%(uagent)" %(requestid)
```

- Usage:
```javascript
import { useHttpLogger } from '@hai.dinh/service-libraries/middlewares';

...
// in your service (Express)
const app = express();

app.use(useHttpLogger)

```
