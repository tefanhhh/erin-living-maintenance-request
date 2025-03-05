'use client'

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { actions } from '@/lib/store/slices/maintenance-request'
import { RootState } from '@/lib/store'
import { Pagination } from '@heroui/react'
import { useCallback } from 'react'

export default function MaintenanceRequestPaginationComponent() {
  const list = useAppSelector(
    (state: RootState) => state.maintenanceRequest.list,
  )
  const queryParam = useAppSelector(
    (state: RootState) => state.maintenanceRequest.queryParam,
  )
  const { setQueryParam } = actions

  const dispatch = useAppDispatch()

  const onChangePagination = useCallback((val: number) => {
    const updatedQueryParam = { ...queryParam, page: val }
    dispatch(setQueryParam(updatedQueryParam))
  }, [])

  return (
    list.paging.count && (
      <div className="flex items-center justify-center mt-8">
        <Pagination
          color="danger"
          showControls
          initialPage={queryParam.page}
          page={queryParam.page}
          total={Math.ceil(list.paging.count / list.paging.perPage)}
          onChange={onChangePagination}
        />
      </div>
    )
  )
}
