'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/lib/stores/index.store'
import { Card, CardBody } from '@heroui/react'
import { motion } from 'framer-motion'

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
    <div className="flex items-center justify-center gap-6 flex-wrap mb-6">
      {summaryTitles.map((it, i) => (
        <motion.div
          key={it.title}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: i * 0.2 }}
        >
          <Card
            key={it.title}
            radius="lg"
            shadow="none"
            className="bg-white w-[90px] h-[90px]"
            style={{ boxShadow: '0px 6px 14px 0px rgba(0, 0, 0, 0.06)' }}
          >
            <CardBody className="px-1 flex flex-col items-center justify-start">
              <h2 className="font-inter font-medium text-primary text-4xl text-center mt-1">
                {summary?.[it.key] || 0}
              </h2>
              <div className="flex-grow flex flex-col items-center justify-center -mt-1">
                <p className="font-inter text-foreground text-[9px] text-center mb-0 leading-[10.89px] tracking-[0.14px]">
                  {it.title}
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}
