'use client'

import MaintenanceRequestSummary from '@/components/maintenance-request/Summary'
import MaintenanceRequestList from '@/components/maintenance-request/List'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/stores/index.store'
import { summary, findAll } from '@/stores/slices/maintenance-request.slice'
import client from '@/lib/apollo.client'
import {
  MaintenanceRequestCreatedSubscription,
  MaintenanceRequestResolvedSubscription,
} from '@/gql/graphql'
import {
  maintenanceRequestCreated,
  maintenanceRequestResolved,
} from '@/gql-query/maintenance-request'
import { Button, Link } from '@heroui/react'

export default function MaintenanceRequestComponent() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(findAll())
    dispatch(summary())

    const maintenanceRequestCreatedSubscription = client
      .subscribe<MaintenanceRequestCreatedSubscription>({
        query: maintenanceRequestCreated,
      })
      .subscribe({
        next(val) {
          if (val?.data?.maintenanceRequestCreated) {
            dispatch(findAll())
            dispatch(summary())
          }
        },
        error(err) {
          console.error('Subscription Error:', err)
        },
      })

    const maintenanceRequestResolvedSubscription = client
      .subscribe<MaintenanceRequestResolvedSubscription>({
        query: maintenanceRequestResolved,
      })
      .subscribe({
        next(val) {
          if (val?.data?.maintenanceRequestResolved) {
            dispatch(findAll())
            dispatch(summary())
          }
        },
        error(err) {
          console.error('Subscription Error:', err)
        },
      })
    return () => {
      if (maintenanceRequestCreatedSubscription) {
        maintenanceRequestCreatedSubscription.unsubscribe()
      }
      if (maintenanceRequestResolvedSubscription) {
        maintenanceRequestResolvedSubscription.unsubscribe()
      }
    }
  }, [dispatch])

  return (
    <div className="container mx-auto px-4 sm:px-0">
      <div className="py-16">
        <h1 className="font-bold text-center text-foreground text-xl tracking-wider mb-6">
          Maintenance Request
        </h1>
        <MaintenanceRequestSummary />
        <MaintenanceRequestList />
      </div>
      <div className="flex items-center justify-end gap-4 sticky left-0 bottom-6 z-10">
        <Button
          type="button"
          as={Link}
          color="primary"
          radius="full"
          isIconOnly
          href="/create"
          className="w-[52px] h-[52px]"
          style={{
            boxShadow: '0px 4px 6px 0px #0000001A, 0px 2px 4px 0px #0000000F',
          }}
        >
          <span className="icon-[heroicons--plus] w-[18px] h-[18px]"></span>
        </Button>
      </div>
    </div>
  )
}
