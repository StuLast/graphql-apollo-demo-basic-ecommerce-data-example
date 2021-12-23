import { ApolloServer } from 'apollo-server';

import typeDefs from './schema';

import Category from './resolvers/category';
import Mutation from './resolvers/mutation';
import Product from './resolvers/product';
import Query from './resolvers/query';
import { products, categories, reviews } from './data/db';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Category, Mutation, Product, Query
  },
  context: {
    products, categories, reviews
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
