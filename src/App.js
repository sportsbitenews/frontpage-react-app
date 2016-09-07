import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import './App.css';
import InBrowserNetworkInterface from './in-browser-network-interface';

import PostList from './PostList';

class App extends Component {
  constructor(...args) {
    super(...args);
    const { schema } = this.props;

    const networkInterface = new InBrowserNetworkInterface({ schema });
    this.client = new ApolloClient({
      networkInterface,
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
