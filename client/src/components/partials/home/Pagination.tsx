'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { actions } from '@/lib/slices/maintenance-request.slice'
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
    console.log(val, 'calllss')
    const updatedQueryParam = { ...queryParam, page: val }
    dispatch(setQueryParam(updatedQueryParam))
  }, [])

  return (
    <div className="flex items-center justify-center mt-8">
      <Pagination
        color="danger"
        page={queryParam.page}
        total={Math.ceil(list.paging.count / list.paging.perPage)}
        onChange={onChangePagination}
      />
    </div>
  )
}
