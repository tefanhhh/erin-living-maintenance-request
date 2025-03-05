import {
  MaintenanceRequestStatus,
  MaintenanceRequestUrgency,
  Paging,
  QueryParamInput,
  Sort,
} from '@/lib/gql/graphql'

export function humanizeEnumText(text: string): string {
  return text
    .split('_')
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(' ')
}

export const STATUS_OPTIONS = Object.values(MaintenanceRequestStatus).map(
  (it) => ({
    label: humanizeEnumText(it),
    value: it,
  }),
)

export const URGENCY_OPTIONS = Object.values(MaintenanceRequestUrgency).map(
  (it) => ({
    label: humanizeEnumText(it),
    value: it,
  }),
)

export const DEFAULT_PAGING: Paging = {
  page: 1,
  perPage: 10,
  prev: false,
  next: false,
  count: 0,
}

export const DEFAULT_QUERY_PARAM: QueryParamInput = {
  page: 1,
  perPage: 5,
  sort: Sort.Latest,
  keyword: '',
}

export const SORT_OPTIONS = Object.values(Sort).map((it) => ({
  label: humanizeEnumText(it),
  value: it,
}))
