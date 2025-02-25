import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/schema.graphql',
  generates: {
    'src/graphql/type.graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers', 'typescript-mongodb'],
    },
  },
}

export default config
