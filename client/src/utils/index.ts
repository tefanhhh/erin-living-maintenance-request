import {
  MaintenanceRequestStatus,
  MaintenanceRequestUrgency,
} from '@/gql/graphql'

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
