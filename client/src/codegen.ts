import 'dotenv/config'
import type { CodegenConfig } from '@graphql-codegen/cli'

if (!process.env.NEXT_PUBLIC_GQL_URL) {
  throw new Error(
    'NEXT_PUBLIC_GQL_URL is not defined in the environment variables',
  )
}

const config: CodegenConfig = {
  overwrite: true,
  schema: process.env.NEXT_PUBLIC_GQL_URL,
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
