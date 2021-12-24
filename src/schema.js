import { gql } from 'apollo-server';

const typeDefs = gql`

  enum Action {
    CREATED
    UPDATED
    DELETED
  }

  type Query {
    products(filter: ProductsFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }

  type Mutation {
    addCategory (input: AddCategoryInput!): MutateCategoryAction!
    deleteCategory(input: DeleteCategoryInput!): MutateCategoryAction!
    updateCategory(input: UpdateCategoryInput!): MutateCategoryAction!
    addProduct (input: AddProductInput!): MutateProductAction!
    deleteProduct(input: DeleteProductInput!): MutateProductAction!
    updateProduct(input: UpdateProductInput!): MutateProductAction!
    addReview (input: AddReviewInput!): MutateReviewAction!
    deleteReview (input: DeleteReviewInput!): MutateReviewAction!
    updateReview (input: UpdateReviewInput!): MutateReviewAction!
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

  input DeleteProductInput {
    id: ID!
  }

  input UpdateProductInput {
    id: ID!
    data: UpdateProductInputData!
  }

  input UpdateProductInputData {
    name: String
    description: String
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

  type MutateProductAction {
    action: Action!
    data: Product!
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

  input UpdateCategoryInput {
    id: ID!
    data: UpdateCategoryInputData!
  }

  input UpdateCategoryInputData {
    name: String
  }

  type MutateCategoryAction {
    action: Action!
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

  input DeleteReviewInput {
    id: ID!
  }

  input UpdateReviewInput {
    id: ID!
    data: UpdateReviewInputData 
  }

  input UpdateReviewInputData {
    date: String
    title: String
    comment: String
    rating: Int
  }

  type MutateReviewAction {
    action: Action!
    data: Review!
  }

`;

export default typeDefs;
