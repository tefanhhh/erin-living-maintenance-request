import {
  CreateMaintenanceRequestMutation,
  FindAllMaintenanceRequestQuery,
  FindOneMaintenanceRequestQuery,
  MaintenanceRequest,
  MaintenanceRequestInput,
  MaintenanceRequestSummary,
  MarkAsResolvedMaintenanceRequestMutation,
  PaginatedMaintenanceRequests,
  QueryParamInput,
  SummaryMaintenanceRequestQuery,
  UpdateMaintenanceRequestMutation,
} from '@/lib/gql/graphql'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import client from '@/lib/apollo'
import {
  createMaintenanceRequest,
  findAllMaintenanceRequest,
  findOneMaintenanceRequest,
  markAsResolvedMaintenanceRequest,
  summaryMaintenanceRequest,
  updateMaintenanceRequest,
} from '@/lib/gql-query/maintenance-request'
import { DEFAULT_PAGING, DEFAULT_QUERY_PARAM } from '@/utils'
import { RootState } from '@/lib/store'

interface MaintenanceRequestState {
  summary: MaintenanceRequestSummary
  list: PaginatedMaintenanceRequests
  detail?: MaintenanceRequest | null
  queryParam: QueryParamInput
}

const initialState: MaintenanceRequestState = {
  summary: {
    open: 0,
    urgent: 0,
    averageDaysToResolve: 0,
  },
  list: {
    items: [],
    paging: DEFAULT_PAGING,
  },
  detail: null,
  queryParam: DEFAULT_QUERY_PARAM,
}

export const summary = createAsyncThunk(
  'maintenance-request/summary',
  async (_, { getState }) => {
    const state = getState() as RootState
    const { data } = await client.query<SummaryMaintenanceRequestQuery>({
      query: summaryMaintenanceRequest,
    })
    return data.summaryMaintenanceRequest || state.maintenanceRequest.summary
  },
)

export const findAll = createAsyncThunk(
  'maintenance-request/findAll',
  async (_, { getState }) => {
    const state = getState() as RootState
    const { data } = await client.query<FindAllMaintenanceRequestQuery>({
      query: findAllMaintenanceRequest,
      variables: {
        queryParam: state.maintenanceRequest.queryParam,
      },
    })
    return data.findAllMaintenanceRequest || state.maintenanceRequest.list
  },
)

export const findOne = createAsyncThunk(
  'maintenance-request/findOne',
  async (_id: string, { getState }) => {
    const state = getState() as RootState
    const { data } = await client.query<FindOneMaintenanceRequestQuery>({
      query: findOneMaintenanceRequest,
      variables: {
        _id,
      },
    })
    return data.findOneMaintenanceRequest || state.maintenanceRequest.detail
  },
)

export const create = createAsyncThunk(
  'maintenance-request/create',
  async (body: MaintenanceRequestInput) => {
    const { data } = await client.mutate<CreateMaintenanceRequestMutation>({
      mutation: createMaintenanceRequest,
      variables: {
        body,
      },
    })
    return data?.createMaintenanceRequest
  },
)

export const update = createAsyncThunk(
  'maintenance-request/update',
  async ({ _id, body }: { _id: string; body: MaintenanceRequestInput }) => {
    const { data } = await client.mutate<UpdateMaintenanceRequestMutation>({
      mutation: updateMaintenanceRequest,
      variables: {
        _id,
        body,
      },
    })
    return data?.updateMaintenanceRequest
  },
)

export const markAsResolved = createAsyncThunk(
  'maintenance-request/markAsResolved',
  async (_id: string) => {
    const { data } =
      await client.mutate<MarkAsResolvedMaintenanceRequestMutation>({
        mutation: markAsResolvedMaintenanceRequest,
        variables: {
          _id,
        },
      })
    return data?.markAsResolvedMaintenanceRequest
  },
)

export const maintenanceRequestSlice = createSlice({
  name: 'maintenance-request',
  initialState,
  reducers: {
    unshiftList(state, action: PayloadAction<MaintenanceRequest>) {
      state.list.items.unshift(action.payload)
    },
    updateList(state, action: PayloadAction<MaintenanceRequest>) {
      const index = state.list.items.findIndex(
        (it) => String(it._id) === String(action.payload._id),
      )
      if (index !== -1) {
        state.list.items.splice(index, 1, action.payload)
      }
    },
    updateAllList(state, action: PayloadAction<PaginatedMaintenanceRequests>) {
      state.list = action.payload
    },
    setQueryParam(state, action: PayloadAction<QueryParamInput>) {
      state.queryParam = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(summary.fulfilled, (state, action) => {
        state.summary = action.payload
      })
      .addCase(findAll.fulfilled, (state, action) => {
        state.list = action.payload
      })
      .addCase(findOne.fulfilled, (state, action) => {
        state.detail = action.payload
      })
      .addCase(create.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.items.unshift(action.payload)
        }
      })
      .addCase(update.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.list.items.findIndex(
            (it) => String(it._id) === String(action.payload?._id),
          )
          if (index !== -1) {
            state.list.items.splice(index, 1, action.payload)
          }
        }
      })
      .addCase(markAsResolved.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.list.items.findIndex(
            (it) => String(it._id) === String(action.payload?._id),
          )
          if (index !== -1) {
            state.list.items.splice(index, 1, action.payload)
          }
        }
      })
  },
})

export const { actions } = maintenanceRequestSlice
