import { ApolloServer, gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    product: [Product!]
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
  }
`;

const resolvers = {
  Query: {
    product() {
      return [
        {
          id: '1',
          name: 'Running Shoes',
          description: 'Road running shoes, neutral, road, low profile',
          quantity: 10,
          price: 69.99,
          onSale: true,
        },
      ];
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
