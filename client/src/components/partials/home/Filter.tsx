import { QueryParamInput, Sort } from '@/lib/gql/graphql'
import { actions } from '@/lib/store/slices/maintenance-request'
import { RootState } from '@/lib/store'
import { Input, Select, SelectItem } from '@heroui/react'
import { useCallback, useState } from 'react'
import debounce from 'lodash/debounce'
import { SORT_OPTIONS } from '@/utils'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'

export default function MaintenanceRequestFilterComponent() {
  // global query param state, used to filter the list from the graphql query
  const queryParam = useAppSelector(
    (state: RootState) => state.maintenanceRequest.queryParam,
  )
  const { setQueryParam } = actions
  const dispatch = useAppDispatch()

  // local state for controlled filter
  const [keyword, setKeyword] = useState<string>(queryParam.keyword)
  const [sort, setSort] = useState<Set<Sort>>(new Set([queryParam.sort]))

  const debouncedSetQueryParam = debounce((val: QueryParamInput) => {
    dispatch(setQueryParam(val))
  }, 300)

  const onChangeFilter = useCallback((val: Partial<QueryParamInput>) => {
    const updatedQueryParam = {
      ...queryParam,
      ...val,
    }
    setKeyword(updatedQueryParam.keyword)
    setSort(new Set([updatedQueryParam.sort]))
    debouncedSetQueryParam(updatedQueryParam)
  }, [])

  return (
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
        value={keyword}
        onValueChange={(e) => {
          onChangeFilter({ keyword: e })
        }}
      />
      <Select
        placeholder="Sort By"
        aria-label="Sort By"
        className="w-44"
        classNames={{
          label: '!text-gray text-sm after:text-gray',
          trigger: 'default-input-wrapper h-12',
          value: ![...sort].length ? '!text-[#dcdcdc]' : '!text-foreground-500',
        }}
        selectionMode="single"
        selectedKeys={sort}
        defaultSelectedKeys={sort}
        disallowEmptySelection
        onChange={(e) => {
          onChangeFilter({ sort: e.target.value as Sort })
        }}
      >
        {SORT_OPTIONS.map((it) => (
          <SelectItem key={it.value}>{it.label}</SelectItem>
        ))}
      </Select>
    </div>
  )
}
