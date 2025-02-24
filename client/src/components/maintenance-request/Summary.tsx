'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/stores/index.store'

export default function MaintenanceRequestSummaryComponent() {
  const summaryTitles = [
    { title: 'Open Requests', key: 'open' },
    { title: 'Urgent Requests', key: 'urgent' },
    { title: 'Average time (days) to resolve', key: 'averageDaysToResolve' },
  ] as const

  const summary = useSelector(
    (state: RootState) => state.maintenanceRequest.summary,
  )

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
