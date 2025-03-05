import { QueryParamInput, Sort } from '@/lib/gql/graphql'
import { actions } from '@/lib/store/slices/maintenance-request'
import { RootState } from '@/lib/store'
import { Input, Select, SelectItem } from '@heroui/react'
import { useCallback, useEffect, useState } from 'react'
import debounce from 'lodash/debounce'
import { SORT_OPTIONS } from '@/utils'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { Pagination } from '@heroui/react'

export default function MaintenanceRequestFilterComponent({
  children,
}: {
  children: React.ReactNode
}) {
  const list = useAppSelector(
    (state: RootState) => state.maintenanceRequest.list,
  )
  const queryParam = useAppSelector(
    (state: RootState) => state.maintenanceRequest.queryParam,
  )
  const { setQueryParam } = actions

  const dispatch = useAppDispatch()

  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<{
    keyword: string
    sort: Set<Sort>
    page: number
  }>({
    keyword: searchParams.get('keyword') || '',
    sort: searchParams.get('sort')
      ? new Set<Sort>([searchParams.get('sort') as Sort])
      : new Set<Sort>([Sort.Latest]),
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
  })

  const debouncedSetQueryParam = debounce((val: QueryParamInput) => {
    dispatch(setQueryParam(val))
  }, 300)

  const onChangeFilters = useCallback((val: Partial<QueryParamInput>) => {
    const updatedQueryParam = {
      keyword: filters.keyword,
      sort: [...filters.sort][0],
      page: filters.page,
      perPage: queryParam.perPage,
      ...val,
    }

    setFilters({
      keyword: updatedQueryParam.keyword,
      sort: new Set([updatedQueryParam.sort]),
      page: updatedQueryParam.page,
    })

    debouncedSetQueryParam(updatedQueryParam)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (filters.keyword) params.set('keyword', filters.keyword)
    if (filters.sort) params.set('sort', [...filters.sort][0])
    if (filters.page) params.set('page', filters.page.toString())
    router.replace(`?${params.toString()}`, { scroll: false })
  }, [filters, router])

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-6">
        <Input
          placeholder="Search Request..."
          aria-label="Search Request"
          classNames={{
            label: '!text-gray text-sm after:text-gray',
            inputWrapper: 'default-input-wrapper h-12',
            input: '!placeholder-[#dcdcdc]',
          }}
          startContent={
            <span className="icon-[heroicons--magnifying-glass] w-5 h-5 text-gray-200"></span>
          }
          value={filters.keyword}
          onValueChange={(e) => {
            onChangeFilters({ keyword: e, page: 1 })
          }}
        />
        <Select
          placeholder="Sort By"
          aria-label="Sort By"
          className="w-44"
          classNames={{
            label: '!text-gray text-sm after:text-gray',
            trigger: 'default-input-wrapper h-12',
            value: ![...filters.sort].length
              ? '!text-[#dcdcdc]'
              : '!text-foreground-500',
          }}
          selectionMode="single"
          selectedKeys={filters.sort}
          defaultSelectedKeys={filters.sort}
          disallowEmptySelection
          onChange={(e) => {
            onChangeFilters({ sort: e.target.value as Sort })
          }}
        >
          {SORT_OPTIONS.map((it) => (
            <SelectItem key={it.value}>{it.label}</SelectItem>
          ))}
        </Select>
      </div>
      {children}
      {list.paging.count ? (
        <div className="flex items-center justify-center mt-8">
          <Pagination
            color="danger"
            showControls
            initialPage={filters.page}
            page={filters.page}
            total={Math.ceil(list.paging.count / list.paging.perPage)}
            onChange={(e) => onChangeFilters({ page: e })}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
