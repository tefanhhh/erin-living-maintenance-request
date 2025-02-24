import 'dotenv/config'
import type { CodegenConfig } from '@graphql-codegen/cli'

if (!process.env.GQL_URL) {
  throw new Error('GQL_URL is not defined in the environment variables')
}

const config: CodegenConfig = {
  schema: process.env.GQL_URL,
  documents: ['src/gql-query/*.ts'],
  generates: {
    './src/gql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
  config: {
    sort: false,
  },
}
export default config
