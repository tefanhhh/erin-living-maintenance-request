import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { Resolvers } from './graphql.type';
import { DateScalar, ObjectIdScalar } from './scalars';
import { maintenanceRequestResolvers } from './modules/maintenance-request/resolver';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const typeDefs = readFileSync(resolve(__dirname, '../src/', 'schema.graphql'), { encoding: 'utf-8' });

const resolvers: Resolvers = {
  ObjectId: ObjectIdScalar,
  Date: DateScalar,
  Query: {
    ...maintenanceRequestResolvers.Query,
  },
  Mutation: {
    ...maintenanceRequestResolvers.Mutation,
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);