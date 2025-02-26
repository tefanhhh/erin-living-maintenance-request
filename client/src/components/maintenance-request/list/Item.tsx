'use client'
import { useRouter } from 'next/navigation'
import React, { useMemo } from 'react'
import dayjs from '@/lib/dayjs'
import {
  MaintenanceRequestStatus,
  MaintenanceRequestUrgency,
} from '@/gql/graphql'
import { useState } from 'react'
import { ObjectId } from 'mongodb'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/stores/index.store'
import { markAsResolved } from '@/slices/maintenance-request.slice'
import { Chip, Card, CardBody, Button, addToast, Link } from '@heroui/react'
import { humanizeEnumText } from '@/utils'

interface MaintenanceRequestItemComponentProps {
  _id: ObjectId
  title: string
  createdAt: string
  urgency: MaintenanceRequestUrgency
  status: MaintenanceRequestStatus
}

export default function MaintenanceRequestItemComponent({
  _id,
  title,
  createdAt,
  urgency,
  status,
}: MaintenanceRequestItemComponentProps) {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const formattedUrgencyText = useMemo(
    () => humanizeEnumText(urgency),
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

  const onMarkAsResolved = async () => {
    setLoading(true)
    try {
      await dispatch(markAsResolved(_id)).unwrap()
      addToast({
        title: 'Maintenance request resolved successfully!',
        color: 'success',
      })
    } catch (err) {
      console.error('GraphQL Error:', err)
    }
    setLoading(false)
  }

  return (
    <Link
      href={
        status === MaintenanceRequestStatus.Open
          ? `/update?_id=${_id.toString()}`
          : '#'
      }
      className={`w-full ${status === MaintenanceRequestStatus.Open ? 'cursor-pointer' : 'pointer-events-none'}`}
    >
      <Card
        radius="lg"
        shadow="none"
        className="bg-white mb-6 w-full"
        style={{
          backdropFilter: 'blur(12px)',
          boxShadow: '0px 8px 32px 0px rgba(110, 113, 145, 0.12)',
        }}
      >
        <CardBody className="px-4 py-5">
          <div className="flex items-center justify-between gap-4 mb-1">
            <h3 className="text-sm text-foreground font-medium tracking-normal">
              {title}
            </h3>
            <span className="text-xs text-gray">
              {dayjs(createdAt).format('DD MMM YYYY')}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className={color}>
              {emoji}&nbsp;
              <span className="font-light text-sm">{formattedUrgencyText}</span>
            </span>
            {status === MaintenanceRequestStatus.Open ? (
              <Button
                type="button"
                color="primary"
                radius="full"
                className="text-white text-xs h-5 font-normal px-2"
                isLoading={loading}
                onPress={onMarkAsResolved}
              >
                {loading ? 'Resolving...' : 'Mark as Resolved'}
              </Button>
            ) : (
              <Chip className="bg-gray text-white text-xs font-normal h-5 px-0">
                Resolved
              </Chip>
            )}
          </div>
        </CardBody>
      </Card>
    </Link>
  )
}
