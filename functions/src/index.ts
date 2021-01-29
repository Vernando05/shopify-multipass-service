import * as functions from 'firebase-functions'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schema'
import resolvers from './resolvers'

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: ({ req }: { req: express.Request }) => {
    console.log(req.ip)
    console.log(req.ips)
    console.log(req.headers)
    console.log(req.headers['fastly-client-ip'])
    console.log(req.headers['x-forwarded-for'])
    console.log(req.connection.remoteAddress)
    return {
      remoteIp: req.headers['fastly-client-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress
    }
  }
})
const app = express()
// app.set('trust proxy', true) 
server.applyMiddleware({ app })

exports.app = functions.https.onRequest(app)

export default app