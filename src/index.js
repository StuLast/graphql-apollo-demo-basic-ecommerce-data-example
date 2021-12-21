import { ApolloServer, gql } from 'apollo-server';

import products from './data/products';
import categories from './data/categories';

const typeDefs = gql`
  type Query {
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
  }

  type Category {
    id: ID!
    name: String!
  }
`;

const resolvers = {
  Query: {
    products(parent, args, ctx, info) {
      return products;
    },
    product(parent, args, ctx, info) {
      const { id } = args;
      return products.find((product) => product.id === id);
    },
    categories() {
      return categories;
    },
    category(parent, args, ctx, info) {
      const { id } = args;
      return categories.find((category) => category.id === id);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server is ready at ${url}`);
});
