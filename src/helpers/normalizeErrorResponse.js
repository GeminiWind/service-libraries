import get from 'lodash.get';

export default function normalizeErrorResponse(response) {
  return {
    statusCode: get(response, 'status'),
    body: get(response, 'data'),
    headers: get(response, 'headers'),
  }
}