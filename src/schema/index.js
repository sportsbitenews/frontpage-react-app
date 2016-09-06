import { makeExecutableSchema } from 'graphql-tools';

import Schema from './frontpage-server/data/schema.js';
import Resolvers from './frontpage-server/data/resolvers';


export default makeExecutableSchema({
  typeDefs: Schema,
  resolvers: Resolvers,
});
