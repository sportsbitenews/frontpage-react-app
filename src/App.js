import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { graphql, ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import './App.css';
import InBrowserNetworkInterface from './in-browser-network-interface';

class PostUpvoter extends Component {
  constructor() {
    super();
    this.state = { postId: false };
  }
  onPostIdChanged(event) {
    this.setState({ postId: event.target.value });
  }
  onUpvotePost(event) {
    event.preventDefault();
    this.props.mutate({ variables: { postId: this.state.postId } });
  }
  render() {
    const { posts } = this.props;

    return (
      <form onSubmit={this.onUpvotePost.bind(this)}>
        <select onChange={this.onPostIdChanged.bind(this)} value={this.state.postId}>
          <option value={false} disabled>Select a post</option>
          {posts.map(post =>
            <option key={post.id} value={post.id}>{post.title}</option>
          )}
        </select>
        <button disabled={!this.state.postId}>Upvote!</button>
      </form>
    )
  }
}

const upvotePost = gql`
  mutation upvotePost($postId: Int) {
    upvotePost(postId: $postId) {
      id
      votes
    }
  }
`;
const PostUpvoterWithMutation = graphql(upvotePost)(PostUpvoter);

function PostList({ loading, posts }) {
  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <div>
        <ul>
          {posts.map(post =>
            <li key={post.id}>
              {post.title} by {' '}
              {post.author.firstName} {post.author.lastName} {' '}
              ({post.votes} votes)
            </li>
          )}
        </ul>
        <PostUpvoterWithMutation posts={posts} />
      </div>
    );
  }
}

const allPosts = gql`
  query allPosts {
    posts {
      id
      title
      votes
      author {
        id
        firstName
        lastName
      }
    }
  }
`

const PostListWithData = graphql(allPosts, {
  props: ({data: { loading, posts }}) => ({
    loading,
    posts,
  }),
})(PostList);

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
        <PostListWithData />
      </ApolloProvider>
    );
  }
}

export default App;
