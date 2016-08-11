import React, { Component } from 'react';
import './App.css';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:64617/')
});

class List extends Component {
  render() {
    const { loading, people } = this.props;

    if (loading) {
      return <p>Loading</p>
    }

    return (
      <ul>
        {people.map(p => <li key={p.name}>{p.name} - {p.height}cm - {p.mass}kg</li>)}
      </ul>
    )
  }
}

const ListWithData = graphql(
  gql`{
    allPeople(first: 10) {
      people {
        name
        height
        mass
      }
    }
  }`,
  null,
  ({ loading, allPeople }) => {
    return {
      loading: loading,
      people: allPeople && allPeople.people,
    };
  }
)(List);


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
