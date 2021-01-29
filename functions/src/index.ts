import * as functions from 'firebase-functions'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schema'
import resolvers from './resolvers'

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: ({ req }: { req: express.Request }) => ({
    remoteIp: req.headers['fastly-client-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
  })
})
const app = express()
app.set('trust proxy', true) 
server.applyMiddleware({ app })

exports.app = functions.https.onRequest(app)

export default app