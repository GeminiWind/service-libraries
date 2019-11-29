import Ajv from 'ajv';
import * as jsonSchemaDraft06 from 'ajv/lib/refs/json-schema-draft-06.json';

const schemaValidator = new Ajv({
  allErrors: true,
  jsonPointers: true,
});

schemaValidator.addMetaSchema(jsonSchemaDraft06);

export default schemaValidator;
