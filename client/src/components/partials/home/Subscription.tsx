'use client'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/lib/store'
import {
  summary,
  findAll,
  actions,
} from '@/lib/store/slices/maintenance-request'
import client from '@/lib/apollo'
import {
  MaintenanceRequestCreatedSubscription,
  MaintenanceRequestResolvedSubscription,
  MaintenanceRequestRunSchedulerSubscription,
  MaintenanceRequestUpdatedSubscription,
} from '@/lib/gql/graphql'
import {
  maintenanceRequestCreated,
  maintenanceRequestResolved,
  maintenanceRequestRunScheduler,
  maintenanceRequestUpdated,
} from '@/lib/gql-query/maintenance-request'

export default function MaintenanceRequestSubscriptionComponent() {
  const { updateList } = actions

  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
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
            dispatch(updateList(val.data.maintenanceRequestResolved))
            dispatch(summary())
          }
        },
        error(err) {
          console.error('Subscription Error:', err)
        },
      })

    const maintenanceRequestUpdatedSubscription = client
      .subscribe<MaintenanceRequestUpdatedSubscription>({
        query: maintenanceRequestUpdated,
      })
      .subscribe({
        next(val) {
          if (val?.data?.maintenanceRequestUpdated) {
            dispatch(updateList(val.data.maintenanceRequestUpdated))
            dispatch(summary())
          }
        },
        error(err) {
          console.error('Subscription Error:', err)
        },
      })

    const maintenanceRequestRunSchedulerSubscription = client
      .subscribe<MaintenanceRequestRunSchedulerSubscription>({
        query: maintenanceRequestRunScheduler,
      })
      .subscribe({
        next(val) {
          if (val?.data?.maintenanceRequestRunScheduler) {
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
      if (maintenanceRequestUpdatedSubscription) {
        maintenanceRequestUpdatedSubscription.unsubscribe()
      }
      if (maintenanceRequestRunSchedulerSubscription) {
        maintenanceRequestRunSchedulerSubscription.unsubscribe()
      }
    }
  }, [dispatch])

  return <></>
}
