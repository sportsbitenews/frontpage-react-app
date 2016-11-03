import React, { Component } from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Client } from 'subscriptions-transport-ws';
import { print } from 'graphql-tag/printer';

import './App.css';

import PostList from './PostList';

// quick way to add the subscribe and unsubscribe functions to the network interface
const addGraphQLSubscriptions = (networkInterface, wsClient) => Object.assign(networkInterface, {
  subscribe: (request, handler) => wsClient.subscribe({
    query: print(request.query),
    variables: request.variables,
  }, handler),
  unsubscribe: (id) => {
    wsClient.unsubscribe(id);
  },
});

class App extends Component {
  constructor(...args) {
    super(...args);

    const networkInterface = createNetworkInterface('http://localhost:8080/graphql');
    const wsClient = new Client('ws://localhost:8090');

    const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
      networkInterface,
      wsClient,
    );

    this.client = new ApolloClient({
      networkInterface: networkInterfaceWithSubscriptions,
      dataIdFromObject: r => r.id,
    });
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        <PostList />
      </ApolloProvider>
    );
  }
}

export default App;
