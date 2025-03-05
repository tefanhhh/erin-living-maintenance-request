import { Sort } from '@/lib/gql/graphql'
import { actions } from '@/lib/slices/maintenance-request.slice'
import { AppDispatch, RootState } from '@/lib/stores/index.store'
import { Input, Select, SelectItem } from '@heroui/react'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import debounce from 'lodash/debounce'
import { SORT_OPTIONS } from '@/utils'

export default function MaintenanceRequestFilterComponent() {
  const queryParam = useSelector(
    (state: RootState) => state.maintenanceRequest.queryParam,
  )
  const { setQueryParam } = actions

  const [sort, setSort] = useState<Set<Sort>>(new Set([queryParam.sort]))

  const dispatch = useDispatch<AppDispatch>()

  const onChangeKeyword = useCallback(
    debounce((val: string) => {
      const updatedQueryParam = { ...queryParam, keyword: val, page: 1 }
      dispatch(setQueryParam(updatedQueryParam))
    }, 300),
    [],
  )

  const onChangeSort = useCallback((val: Set<Sort>) => {
    const updatedQueryParam = { ...queryParam, sort: [...val][0], page: 1 }
    dispatch(setQueryParam(updatedQueryParam))
  }, [])

  return (
    <div className="flex items-center justify-between gap-2 mb-6">
      <Input
        placeholder="Search Request..."
        classNames={{
          label: '!text-gray text-sm after:text-gray',
          inputWrapper: 'default-input-wrapper h-12',
          input: '!placeholder-[#dcdcdc]',
        }}
        startContent={
          <span className="icon-[heroicons--magnifying-glass] w-5 h-5 text-gray-200"></span>
        }
        onValueChange={onChangeKeyword}
      />
      <Select
        placeholder="Sort By"
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
          setSort(new Set([e.target.value as Sort]))
          onChangeSort(new Set([e.target.value as Sort]))
        }}
      >
        {SORT_OPTIONS.map((it) => (
          <SelectItem key={it.value}>{it.label}</SelectItem>
        ))}
      </Select>
    </div>
  )
}
