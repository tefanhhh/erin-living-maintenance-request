import { GraphQLScalarType, Kind, ValueNode } from 'graphql'
import { ObjectId } from 'mongodb'

export const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'MongoDB ObjectId custom scalar',
  serialize(value: unknown): string {
    if (value instanceof ObjectId) {
      return value.toHexString()
    }
    throw new Error('ObjectId must be an instance of ObjectId')
  },
  parseValue(value: unknown): ObjectId {
    if (typeof value === 'string') {
      return new ObjectId(value)
    }
    throw new Error('ObjectId must be a string')
  },
  parseLiteral(ast): ObjectId {
    if (ast.kind === Kind.STRING) {
      return new ObjectId(ast.value)
    }
    throw new Error('ObjectId must be a string')
  },
})

export const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value: Date): string {
    return new Date(value).toISOString()
  },
  parseValue(value: string): Date {
    return new Date(value)
  },
  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value)
    }
    return null
  },
})
