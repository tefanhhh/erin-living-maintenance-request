import React, { useMemo } from 'react'
import dayjs from '@/lib/dayjs'
import {
  MaintenanceRequestStatus,
  MaintenanceRequestUrgency,
} from '@/gql/graphql'

interface MaintenanceRequestItemProps {
  title?: string | null
  createdAt?: string | null
  urgency?: MaintenanceRequestUrgency | null
  status?: MaintenanceRequestStatus | null
}

export default function MaintenanceRequestItem({
  title,
  createdAt,
  urgency,
  status,
}: MaintenanceRequestItemProps) {
  const formattedUrgencyText = useMemo(
    () =>
      urgency
        ?.split('_')
        .map(
          (word: string) =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' '),
    [urgency],
  )

  const emoji = useMemo(() => {
    switch (urgency) {
      case MaintenanceRequestUrgency.Urgent:
        return '⚡️'
      case MaintenanceRequestUrgency.NoneUrgent:
        return '🙂 '
      case MaintenanceRequestUrgency.Emergency:
        return '🔥'
      case MaintenanceRequestUrgency.LessUrgent:
        return '🔨'
      default:
        return ''
    }
  }, [urgency])

  const color = useMemo(() => {
    switch (urgency) {
      case MaintenanceRequestUrgency.Urgent:
        return 'text-orange'
      case MaintenanceRequestUrgency.NoneUrgent:
        return 'text-primary-200'
      case MaintenanceRequestUrgency.Emergency:
        return 'text-red'
      case MaintenanceRequestUrgency.LessUrgent:
        return 'text-blue'
      default:
        return ''
    }
  }, [urgency])

  return (
    <li className="bg-white rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between gap-4 mb-2">
        <h3 className="text-sm text-foreground tracking-normal">{title}</h3>
        <span className="text-xs text-gray">
          {dayjs(createdAt).format('DD MMM YYYY')}
        </span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <span className={color}>
          {emoji}&nbsp;
          {formattedUrgencyText}
        </span>
        {status === MaintenanceRequestStatus.Open ? (
          <button
            type="button"
            className="bg-primary rounded-full py-1 px-2 text-white text-xs"
          >
            Mark as Resolved
          </button>
        ) : (
          <span className="bg-gray text-white py-1.5 px-2 rounded-full text-xs">
            Resolved
          </span>
        )}
      </div>
    </li>
  )
}
