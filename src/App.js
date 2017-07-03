import React, { Component } from 'react';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import { createApolloFetch } from 'apollo-fetch';
import { print } from 'graphql/language/printer';

import './App.css';

import PostList from './PostList';

class App extends Component {
  constructor(...args) {
    super(...args);

    // See server code here: https://launchpad.graphql.com/1jzxrj179
    const apolloFetch = createApolloFetch({ uri: 'https://1jzxrj179.lp.gql.zone/graphql' });

    // This is creating a network interface using the new apollo-fetch package
    const networkInterface = {
      query: (req) => apolloFetch({...req, query: print(req.query)})
    };

    this.client = new ApolloClient({ networkInterface });
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
