import { find, filter } from 'lodash';

const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
];

const posts = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL' },
  { id: 2, authorId: 2, title: 'GraphQL Rocks' },
  { id: 3, authorId: 2, title: 'Advanced GraphQL' },
];

const resolveFunctions = {
  RootQuery: {
    authors() {
      return authors;
    },
  },
  RootMutation: {
    createPost(_, { title, authorId }) {
      const post = {
        id: posts.length + 1,
        title,
        authorId,
      };
      posts.push(post);
      return post;
    }
  },
  Author: {
    posts(author) {
      return filter(posts, { authorId: author.id });
    },
  },
  Post: {
    author(post) {
      return find(authors, { id: post.authorId });
    },
  }
}

export default resolveFunctions;
