import { Paging, QueryParamInput } from '../graphql/type.graphql'

export function escapeRegex(val: string): string {
  return val.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export function pagingFactory<T>(
  items: T[],
  count: number,
  queryParam: QueryParamInput,
): {
  items: T[]
  paging: Paging
} {
  const { page, perPage } = queryParam
  return {
    items: items,
    paging: {
      count,
      page,
      perPage,
      prev: page > 1,
      next: page < Math.ceil(count / Number(perPage)),
    },
  }
}
