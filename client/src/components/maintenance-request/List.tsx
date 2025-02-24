'use client'
import MaintenanceRequestItem from '@/components/maintenance-request/Item'
import { RootState } from '@/stores/index.store'
import { useSelector } from 'react-redux'

export default function MaintenanceRequestListComponent() {
  const list = useSelector((state: RootState) => state.maintenanceRequest.list)
  return (
    <ul className="mt-4">
      {list?.map((it, i) => {
        return (
          <MaintenanceRequestItem
            key={i}
            _id={it._id}
            title={it.title}
            urgency={it.urgency}
            status={it.status}
            createdAt={it.createdAt}
          />
        )
      })}
    </ul>
  )
}
