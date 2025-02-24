'use client'
import {
  FindAllMaintenanceRequestsQuery,
  MaintenanceRequestCreatedSubscription,
  MaintenanceRequestResolvedSubscription,
} from '@/gql/graphql'
import { useState, useEffect } from 'react'
import client from '@/lib/apollo.client'
import {
  findAllMaintenanceRequests,
  maintenanceRequestCreated,
  maintenanceRequestResolved,
} from '@/gql-query/maintenance-request'
import MaintenanceRequestItem from '@/components/maintenance-request/Item'

export default function MaintenanceRequestList() {
  const [maintenanceRequests, setMaintenanceRequests] = useState<
    FindAllMaintenanceRequestsQuery['findAllMaintenanceRequests']
  >([])

  useEffect(() => {
    async function fetchMaintenanceRequests() {
      const { data } = await client.query<FindAllMaintenanceRequestsQuery>({
        query: findAllMaintenanceRequests,
      })
      setMaintenanceRequests(data?.findAllMaintenanceRequests)
    }
    fetchMaintenanceRequests()

    client
      .subscribe<MaintenanceRequestCreatedSubscription>({
        query: maintenanceRequestCreated,
      })
      .subscribe({
        next(val) {
          if (val?.data?.maintenanceRequestCreated) {
            setMaintenanceRequests((prev) => [
              val.data!.maintenanceRequestCreated!,
              ...prev!,
            ])
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
            setMaintenanceRequests((prev) => {
              const copy = [...prev!]
              const index = copy?.findIndex(
                (it) =>
                  String(it?._id) ===
                  String(val.data?.maintenanceRequestResolved?._id),
              )
              if (index !== -1) {
                copy.splice(index, 1, val.data!.maintenanceRequestResolved!)
                return copy
              }

              return [...copy]
            })
          }
        },
        error(err) {
          console.error('Subscription Error:', err)
        },
      })
  }, [])

  return (
    <ul className="mt-4">
      {maintenanceRequests?.map((it, i) => {
        return (
          <MaintenanceRequestItem
            key={i}
            _id={it?._id}
            title={it?.title}
            urgency={it?.urgency}
            status={it?.status}
            createdAt={it?.createdAt}
          />
        )
      })}
    </ul>
  )
}
