import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import './App.css';
import InBrowserNetworkInterface from './in-browser-network-interface';
import schema from './schema';

const networkInterface = new InBrowserNetworkInterface({ schema });
const client = new ApolloClient({ networkInterface });

class List extends Component {
  render() {
    const { loading, posts } = this.props;

    if (loading) {
      return <p>Loading</p>
    }

    return (
      <ul>
        {posts.map(p => <li key={p.id}>{p.title}</li>)}
      </ul>
    )
  }
}

const POSTS_QUERY = gql`{
  author(firstName: "Sashko", lastName: "Stubailo") {
    id
    posts {
      id
      title
      text
    }
  }
}`

const withPosts = graphql(POSTS_QUERY, {
  props: ({data: { loading, author, errors }}) => ({
    loading,
    posts: author && author.posts,
  }),
});

const ListWithData = withPosts(List);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <ListWithData />
      </ApolloProvider>
    );
  }
}

export default App;
