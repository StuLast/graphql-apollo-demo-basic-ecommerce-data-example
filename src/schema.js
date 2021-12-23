import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    products(filter: ProductsFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addCategory (input: AddCategoryInput!): MutateCategoryAction!
    addProduct (input: AddProductInput!): Product!
    addReview (input: AddReviewInput!): Review!
    deleteCategory(input: DeleteCategoryInput): MutateCategoryAction!
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    category: Category
    reviews: [Review!]!
  }

  input AddProductInput {
    name: String!
    description: String!
    quantity: Int
    price: Float
    image: String
    onSale: Boolean 
    categoryId: ID
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }


  type Category {
    id: ID!
    name: String!
    products(filter: ProductsFilterInput): [Product]!
  }

  input AddCategoryInput {
    name: String!
  }

  input DeleteCategoryInput {
    id: ID!
  }

  type MutateCategoryAction {
    action: String!
    data: Category!
  }

  type Review {
    id: ID!,
    date: String!,
    title: String!,
    comment: String!,
    rating: Int!,
  }

  input AddReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }


`;

export default typeDefs;
