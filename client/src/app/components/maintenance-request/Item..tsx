'use client'

import React, { useMemo } from 'react'
import dayjs from '@/lib/dayjs'
import {
  MaintenanceRequestStatus,
  MaintenanceRequestUrgency,
} from '@/gql/graphql'
import client from '@/lib/apollo.client'
import { useState } from 'react'
import { ObjectId } from 'mongodb'
import { markAsResolvedMaintenanceRequest } from '@/gql-query/maintenance-request'

interface MaintenanceRequestItemProps {
  _id?: ObjectId
  title?: string | null
  createdAt?: string | null
  urgency?: MaintenanceRequestUrgency | null
  status?: MaintenanceRequestStatus | null
}

export default function MaintenanceRequestItem({
  _id,
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

  const [loading, setLoading] = useState(false)

  const markAsResolved = async () => {
    setLoading(true)
    try {
      const response = await client.mutate({
        mutation: markAsResolvedMaintenanceRequest,
        variables: {
          _id,
        },
      })
      console.log('GraphQL Response:', response.data)
      alert('Maintenance request created successfully!')
    } catch (err) {
      console.error('GraphQL Error:', err)
    }
    setLoading(false)
  }

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
            disabled={loading}
            className="bg-primary rounded-full py-1 px-2 text-white text-xs disabled:opacity-50"
            onClick={markAsResolved}
          >
            {loading ? 'Resolving...' : 'Mark as Resolved'}
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
