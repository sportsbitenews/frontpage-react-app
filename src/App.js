import React, { Component, PropTypes } from 'react';
import ApolloClient from 'apollo-client';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import './App.css';
import InBrowserNetworkInterface from './in-browser-network-interface';
import schema from './schema';

const networkInterface = new InBrowserNetworkInterface({ schema });
const client = new ApolloClient({ networkInterface });

function PostList({ posts }) {
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

class PostCreator extends Component {
  static propTypes = {
    onAddPost: React.PropTypes.func.isRequired,
  }

  constructor() {
    super();
    this.state = { title: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ title: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.onAddPost(this.state.title);
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        Create Post:
        <input value={this.state.title} onChange={this.onInputChange} />
        <button type="submit">Create</button>
      </form>
    );
  }
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $authorId: Int!) {
    createPost(title: $title, authorId: $authorId) {
      id
    }
  }
`;

const withCreatePost = graphql(CREATE_POST_MUTATION, {
  props: ({ ownProps, mutate }) => ({
    onAddPost(title) {
      const { authorId, refetchAuthors } = ownProps;
      mutate({ variables: { title, authorId } })
        .then(refetchAuthors);
    },
  }),
});

const PostCreatorWithMutation = withCreatePost(PostCreator);
PostCreatorWithMutation.propTypes = {
  authorId: PropTypes.number.isRequired,
  refetchAuthors: PropTypes.func.isRequired,
};

class AuthorList extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    authors: PropTypes.array,
  }

  render() {
    const { loading, authors, refetchAuthors } = this.props;

    if (loading) {
      return <p>Loading</p>
    }

    return (
      <ul>
        {authors.map(author => {
          return (
            <li key={author.id}>
              {author.firstName} {author.lastName}
              <PostCreatorWithMutation
                authorId={author.id}
                refetchAuthors={refetchAuthors}
              />
              <PostList posts={author.posts} />
            </li>
          );
        })}
      </ul>
    )
  }
}

const POSTS_QUERY = gql`{
  authors {
    id
    firstName
    lastName
    posts {
      id
      title
    }
  }
}`

const withPosts = graphql(POSTS_QUERY, {
  props: ({data: { loading, authors, refetch }}) => ({
    loading,
    authors,
    refetchAuthors: refetch,
  }),
});

const AuthorListWithData = withPosts(AuthorList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AuthorListWithData />
      </ApolloProvider>
    );
  }
}

export default App;
