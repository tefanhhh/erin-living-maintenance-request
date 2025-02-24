'use client'

import Link from 'next/link'
import MaintenanceRequestSummary from '@/components/maintenance-request/Summary'
import MaintenanceRequestList from '@/components/maintenance-request/List'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/stores/index.store'
import { maintenanceRequestActions } from '@/stores/slices/maintenance-request.slice'
import client from '@/lib/apollo.client'
import {
  FindAllMaintenanceRequestsQuery,
  MaintenanceRequestCreatedSubscription,
  MaintenanceRequestResolvedSubscription,
  SummaryMaintenanceRequestQuery,
} from '@/gql/graphql'
import {
  findAllMaintenanceRequests,
  maintenanceRequestCreated,
  maintenanceRequestResolved,
  summaryMaintenanceRequest,
} from '@/gql-query/maintenance-request'

export default function MaintenanceRequestComponent() {
  const { setList, unshiftList, updateListItem, setSummary } =
    maintenanceRequestActions

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    async function fetchMaintenanceRequests() {
      const { data } = await client.query<FindAllMaintenanceRequestsQuery>({
        query: findAllMaintenanceRequests,
      })
      dispatch(setList(data.findAllMaintenanceRequests ?? []))
    }
    fetchMaintenanceRequests()

    async function fetchSummary() {
      const { data } = await client.query<SummaryMaintenanceRequestQuery>({
        query: summaryMaintenanceRequest,
      })
      setSummary({
        open: data?.summaryMaintenanceRequest?.open || 0,
        urgent: data?.summaryMaintenanceRequest?.urgent || 0,
        averageDaysToResolve:
          data?.summaryMaintenanceRequest?.averageDaysToResolve || 0,
      })
    }
    fetchSummary()

    client
      .subscribe<MaintenanceRequestCreatedSubscription>({
        query: maintenanceRequestCreated,
      })
      .subscribe({
        next(val) {
          if (val?.data?.maintenanceRequestCreated) {
            dispatch(unshiftList(val.data.maintenanceRequestCreated))
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
            dispatch(updateListItem(val.data.maintenanceRequestResolved))
            fetchSummary()
          }
        },
        error(err) {
          console.error('Subscription Error:', err)
        },
      })
  }, [dispatch, setList, setSummary, unshiftList, updateListItem])

  return (
    <div className="container mx-auto px-4 sm:px-0">
      <div className="py-16">
        <h1 className="font-inter font-bold text-center text-foreground text-xl tracking-wider mb-8">
          Maintenance Request
        </h1>
        <MaintenanceRequestSummary />
        <MaintenanceRequestList />
      </div>
      <div className="flex items-center justify-end gap-4 sticky left-0 bottom-6 z-10">
        <Link href="/update">
          <button
            type="button"
            className="rounded-full bg-primary text-white w-14 h-14 flex items-center justify-center"
            style={{
              boxShadow: '0px 4px 6px 0px #0000001A, 0px 2px 4px 0px #0000000F',
            }}
          >
            <span className="icon-[heroicons--plus] w-5 h-5"></span>
          </button>
        </Link>
      </div>
    </div>
  )
}
