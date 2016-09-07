import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

function PostUpvoter({ mutate, postId }) {
  return (
    <button onClick={() => mutate({ variables: { postId }})}>
      Upvote
    </button>
  )
}
export default graphql(gql`
  mutation upvotePost($postId: Int!) {
    upvotePost(postId: $postId) {
      id
      votes
    }
  }
`)(PostUpvoter);
