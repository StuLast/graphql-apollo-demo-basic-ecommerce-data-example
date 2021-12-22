import { ApolloServer } from 'apollo-server';

import typeDefs from './schema';
import { Query } from './resolvers/query';
import { Category } from './resolvers/category';
import { Product } from './resolvers/product';
import { products, categories, reviews} from './data/db';

const server = new ApolloServer({
  typeDefs,
  resolvers: { 
    Query, Category, Product
  },
  context: {
    products, categories, reviews
  },
});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
