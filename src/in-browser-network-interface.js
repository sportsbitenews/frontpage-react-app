import { execute } from 'graphql';

class InBrowserNetworkInterface {
  constructor({ schema }) {
    this.schema = schema;
  }

  query(request) {
    return execute(
      this.schema,
      request.query,
      {},
      {},
      request.variables,
      request.operationName);
  }
}

export default InBrowserNetworkInterface;
