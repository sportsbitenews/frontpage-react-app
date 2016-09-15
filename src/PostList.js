import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import PostUpvoter from './PostUpvoter';

function PostList({ data: { loading, posts } }) {
  if (loading) {
    return <div>Loading</div>;
  } else {
    return (
      <ul>
        {posts.sort((x, y) => y.votes - x.votes).map(post =>
          <li key={post.id}>
            {post.title} by {' '}
            {post.author.firstName} {post.author.lastName} {' '}
            <span>({post.votes} votes)</span>

            <PostUpvoter postId={post.id} />
          </li>
        )}
      </ul>
    );
  }
}


export default graphql(gql`
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
`)(PostList);
