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
    category: Category!
    categoryId: ID!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
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

  Category: {
    products(parent, args, ctx, info) {
      const { id } = parent;
      return products.filter((product) => product.categoryId === id);
    },
  },

  Product: {
    category(parent, args, ctx, info) {
      const { categoryId } = parent;
      return categories.find((category) => category.id === categoryId);
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
