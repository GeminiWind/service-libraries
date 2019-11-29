import get from 'lodash.get';

export default function normalizeDocument(doc) {
  return {
    Id: doc.id,
    Path: get(doc, 'attributes.Path'),
    Content: get(doc, 'attributes.Content'),
    Type: get(doc, 'attributes.Type'),
    Attributes: get(doc, 'attributes.Attributes'),
  };
}
