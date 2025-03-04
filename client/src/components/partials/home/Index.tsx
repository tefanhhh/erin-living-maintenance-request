'use client'

import MaintenanceRequestSummary from '@/components/partials/home/Summary'
import MaintenanceRequestList from '@/components/partials/home/list/Index'
import { useEffect } from 'react'
import { RootState } from '@/lib/store'
import {
  summary,
  findAll,
  actions,
} from '@/lib/store/slices/maintenance-request'
import { Button, Link } from '@heroui/react'
import MaintenanceRequestSubscription from '@/components/partials/home/Subscription'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { useSearchParams } from 'next/navigation'
import { Sort } from '@/lib/gql/graphql'

export default function MaintenanceRequestComponent() {
  const queryParam = useAppSelector(
    (state: RootState) => state.maintenanceRequest.queryParam,
  )
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const { setQueryParam } = actions

  useEffect(() => {
    dispatch(summary())
  }, [dispatch])

  useEffect(() => {
    dispatch(findAll())
  }, [dispatch, queryParam])

  useEffect(() => {
    const updatedQueryParam = { ...queryParam }

    if (searchParams.get('keyword')) {
      updatedQueryParam.keyword = searchParams.get('keyword')!
    }

    if (searchParams.get('sort')) {
      updatedQueryParam.sort = searchParams.get('sort') as Sort
    }

    if (searchParams.get('page')) {
      updatedQueryParam.page = Number(searchParams.get('page'))
    }

    if (JSON.stringify(updatedQueryParam) !== JSON.stringify(queryParam)) {
      dispatch(setQueryParam(updatedQueryParam))
    }
  }, [searchParams])

  return (
    <div className="container mx-auto px-4 sm:px-0">
      <div className="py-16">
        <h1 className="font-bold text-center text-foreground text-xl tracking-wider mb-6">
          Maintenance Request
        </h1>
        <MaintenanceRequestSubscription />
        <MaintenanceRequestSummary />
        <MaintenanceRequestList />
      </div>
      <div className="flex items-center justify-end gap-4 sticky left-0 bottom-6 z-10">
        <Link href="/update">
          <Button
            type="button"
            color="primary"
            radius="full"
            isIconOnly
            className="w-[52px] h-[52px]"
            style={{
              boxShadow: '0px 4px 6px 0px #0000001A, 0px 2px 4px 0px #0000000F',
            }}
          >
            <span className="icon-[heroicons--plus] w-[18px] h-[18px]"></span>
          </Button>
        </Link>
      </div>
    </div>
  )
}
