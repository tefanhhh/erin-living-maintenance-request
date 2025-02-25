'use client'
import MaintenanceRequestItem from '@/components/maintenance-request/list/Item'
import { RootState } from '@/stores/index.store'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

export default function MaintenanceRequestListComponent() {
  const list = useSelector((state: RootState) => state.maintenanceRequest.list)
  return (
    <ul className="mt-4">
      {list?.map((it, i) => (
        <motion.li
          key={`motion-${it._id}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, delay: i * 0.1 }}
        >
          <MaintenanceRequestItem
            key={it._id}
            _id={it._id}
            title={it.title}
            urgency={it.urgency}
            status={it.status}
            createdAt={it.createdAt}
          />
        </motion.li>
      ))}
    </ul>
  )
}
