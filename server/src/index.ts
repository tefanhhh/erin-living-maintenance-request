import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { Resolvers } from './graphql.type'
import { DateScalar, ObjectIdScalar } from './scalars'
import { maintenanceRequestResolvers } from './modules/maintenance-request/resolver'
import dbConnection from './db/connection'
import { createServer } from 'http'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import express from 'express'

async function bootstrap() {
  const app = express()
  const typeDefs = readFileSync(
    resolve(
      dirname(fileURLToPath(import.meta.url)),
      '../src/',
      'schema.graphql',
    ),
    { encoding: 'utf-8' },
  )

  const resolvers: Resolvers = {
    ObjectId: ObjectIdScalar,
    Date: DateScalar,
    Query: {
      ...maintenanceRequestResolvers.Query,
    },
    Mutation: {
      ...maintenanceRequestResolvers.Mutation,
    },
    Subscription: {
      ...maintenanceRequestResolvers.Subscription,
    },
  }
  const schema = makeExecutableSchema({ typeDefs, resolvers })
  try {
    await dbConnection()
    console.log('Connected to the database')

    const httpServer = createServer(app)
    const wsServer = new WebSocketServer({
      server: httpServer,
      path: '/',
    })
    const serverCleanup = useServer({ schema }, wsServer)
    const server = new ApolloServer({
      schema,
      introspection: true,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose()
              },
            }
          },
        },
      ],
    })

    await server.start()
    app.use(
      '/',
      cors<cors.CorsRequest>({ origin: '*' }),
      express.json(),
      expressMiddleware(server),
    )

    await new Promise<void>((resolve) =>
      httpServer.listen({ port: 4000 }, resolve),
    )
    console.log(`🚀 Server ready at http://localhost:4000/`)
  } catch (error) {
    console.error('❌ Failed to connect to database:', error)
    process.exit(1)
  }
}

await bootstrap()
