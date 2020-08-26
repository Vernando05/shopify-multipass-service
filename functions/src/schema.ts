import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Query {
    hello: String
  }
  input CustomerInput {
    firstName: String!
    lastName: String!
    email: String!
  }
  type Customer {
    firstName: String!
    lastName: String!
    email: String!
    created_at: String!
    token: String!
    remoteIp: String
  }
  type Mutation {
    createMultipassToken(data: CustomerInput!): Customer!
  }
`
export default typeDefs
