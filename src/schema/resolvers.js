import { find, filter } from 'lodash';

const authors = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
];

const posts = [
  { id: 1, authorId: 2, title: 'GraphQL Rocks', text: 'GraphQL Rocks' }
];

const resolveFunctions = {
  RootQuery: {
    author(_, { firstName, lastName }) {
      return find(authors, { firstName, lastName });
    },
  },
  RootMutation: {
    // XXX: todo
    createAuthor() {}
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
