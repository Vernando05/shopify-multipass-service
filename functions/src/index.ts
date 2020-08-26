import * as functions from 'firebase-functions'
import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './schema'
import resolvers from './resolvers'

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  context: ({ req }: { req: express.Request }) => ({
    remoteIp: req.ip
  })
})
const app = express()
app.set('trust proxy', true)
server.applyMiddleware({ app })
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
)
exports.app = functions.https.onRequest(app)