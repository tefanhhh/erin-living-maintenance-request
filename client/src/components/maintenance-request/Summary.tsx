'use client'

import client from '@/lib/apollo.client'
import {
  MaintenanceRequestCreatedSubscription,
  MaintenanceRequestResolvedSubscription,
  SummaryMaintenanceRequestQuery,
} from '@/gql/graphql'
import {
  maintenanceRequestCreated,
  maintenanceRequestResolved,
  summaryMaintenanceRequest,
} from '@/gql-query/maintenance-request'
import { useState, useEffect } from 'react'

export default function MaintenanceRequestSummary() {
  const summaryTitles = [
    { title: 'Open Requests', key: 'open' },
    { title: 'Urgent Requests', key: 'urgent' },
    { title: 'Average time (days) to resolve', key: 'averageDaysToResolve' },
  ] as const

  const [summary, setSummary] = useState<
    SummaryMaintenanceRequestQuery['summaryMaintenanceRequest']
  >({})

  useEffect(() => {
    async function fetchSummary() {
      const { data } = await client.query<SummaryMaintenanceRequestQuery>({
        query: summaryMaintenanceRequest,
      })
      setSummary(data?.summaryMaintenanceRequest || {})
    }
    fetchSummary()

    client
      .subscribe<MaintenanceRequestCreatedSubscription>({
        query: maintenanceRequestCreated,
      })
      .subscribe({
        next(val) {
          if (val?.data?.maintenanceRequestCreated) {
            fetchSummary()
          }
        },
        error(err) {
          console.error('Subscription Error:', err)
        },
      })

    client
      .subscribe<MaintenanceRequestResolvedSubscription>({
        query: maintenanceRequestResolved,
      })
      .subscribe({
        next(val) {
          if (val?.data?.maintenanceRequestResolved) {
            fetchSummary()
          }
        },
        error(err) {
          console.error('Subscription Error:', err)
        },
      })
  }, [])

  return (
    <div className="flex items-center justify-center gap-4 flex-wrap mb-8">
      {summaryTitles.map((it) => (
        <div
          key={it.title}
          className="w-[90px] h-[90px] rounded-xl bg-white px-1 flex flex-col items-center justify-start pt-4"
          style={{ boxShadow: '0px 6px 14px 0px rgba(0, 0, 0, 0.06)' }}
        >
          <h2 className="font-inter font-bold text-primary text-3xl text-center">
            {summary?.[it.key] || 0}
          </h2>
          <p className="font-inter text-foreground text-[9px] text-center mb-0 leading-[10.89px]">
            {it.title}
          </p>
        </div>
      ))}
    </div>
  )
}
