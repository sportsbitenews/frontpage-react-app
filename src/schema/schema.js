const typeDefinitions = `
type Author {
  id: Int! # the ! means that every author object _must_ have an id
  firstName: String
  lastName: String
  posts: [Post] # the list of Posts by this author
}

type Post {
  id: Int!
  title: String
  author: Author
}

# the schema allows the following query:
type RootQuery {
  authors: [Author]
}

# this schema allows the following mutation:
type RootMutation {
  createPost (
    title: String!
    authorId: Int!
  ): Post
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: RootQuery
  mutation: RootMutation
}
`;

export default [typeDefinitions];
