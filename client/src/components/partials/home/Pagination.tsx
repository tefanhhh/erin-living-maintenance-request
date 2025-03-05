'use client'

import { actions } from '@/lib/slices/maintenance-request.slice'
import { AppDispatch, RootState } from '@/lib/stores/index.store'
import { Pagination } from '@heroui/react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function MaintenanceRequestPaginationComponent() {
  const list = useSelector((state: RootState) => state.maintenanceRequest.list)
  const queryParam = useSelector(
    (state: RootState) => state.maintenanceRequest.queryParam,
  )
  const { setQueryParam } = actions

  const dispatch = useDispatch<AppDispatch>()

  const onChangePagination = useCallback((val: number) => {
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
