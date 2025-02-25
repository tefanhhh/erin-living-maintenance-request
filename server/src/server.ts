import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import cors from 'cors'
import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { Resolvers } from './graphql/type.graphql'
import { DateScalar, ObjectIdScalar } from './graphql/scalars.graphql'
import { createServer } from 'http'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import express from 'express'
import { container } from './di.container'
import { MaintenanceRequestResolver } from './repositories/maintenance-request/maintenance-request.resolver'

export async function start() {
  try {
    const typeDefs = readFileSync(
      resolve(
        dirname(fileURLToPath(import.meta.url)),
        '../src/',
        'graphql/schema.graphql',
      ),
      { encoding: 'utf-8' },
    )
    const maintenanceRequestResolvers = container.get(
      MaintenanceRequestResolver,
    )

    const resolvers: Resolvers = {
      ObjectId: ObjectIdScalar,
      Date: DateScalar,
      Query: {
        ...maintenanceRequestResolvers.getResolvers().Query,
      },
      Mutation: {
        ...maintenanceRequestResolvers.getResolvers().Mutation,
      },
      Subscription: {
        ...maintenanceRequestResolvers.getResolvers().Subscription,
      },
    }

    const schema = makeExecutableSchema({ typeDefs, resolvers })

    const app = express()
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

    const port = process.env.PORT ? Number(process.env.PORT) : 4000
    await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))
    console.log(`🚀 Server ready at http://localhost:${port}/`)
  } catch (error) {
    console.error('❌ Failed to connect to server:', error)
    process.exit(1)
  }
}
