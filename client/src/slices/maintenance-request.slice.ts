import {
  CreateMaintenanceRequestMutation,
  FindAllMaintenanceRequestsQuery,
  MaintenanceRequest,
  MaintenanceRequestSummary,
  MarkAsResolvedMaintenanceRequestMutation,
  SummaryMaintenanceRequestQuery,
} from '@/gql/graphql'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import client from '@/lib/apollo.client'
import {
  createMaintenanceRequest,
  findAllMaintenanceRequests,
  markAsResolvedMaintenanceRequest,
  summaryMaintenanceRequest,
} from '@/gql-query/maintenance-request'
import { MaintenanceRequestSchema } from '@/schema/maintnance-request.schema'
import { ObjectId } from 'mongodb'

interface MaintenanceRequestState {
  summary: MaintenanceRequestSummary
  list: MaintenanceRequest[]
}

const initialState: MaintenanceRequestState = {
  summary: {
    open: 0,
    urgent: 0,
    averageDaysToResolve: 0,
  },
  list: [],
}

export const summary = createAsyncThunk(
  'maintenance-request/summary',
  async () => {
    const { data } = await client.query<SummaryMaintenanceRequestQuery>({
      query: summaryMaintenanceRequest,
    })
    return (
      data.summaryMaintenanceRequest || {
        open: 0,
        urgent: 0,
        averageDaysToResolve: 0,
      }
    )
  },
)

export const findAll = createAsyncThunk(
  'maintenance-request/findAll',
  async () => {
    const { data } = await client.query<FindAllMaintenanceRequestsQuery>({
      query: findAllMaintenanceRequests,
    })
    return data.findAllMaintenanceRequests || []
  },
)

export const create = createAsyncThunk(
  'maintenance-request/create',
  async (body: MaintenanceRequestSchema) => {
    const { data } = await client.mutate<CreateMaintenanceRequestMutation>({
      mutation: createMaintenanceRequest,
      variables: {
        body,
      },
    })
    return data?.createMaintenanceRequest
  },
)

export const markAsResolved = createAsyncThunk(
  'maintenance-request/markAsResolved',
  async (_id: ObjectId) => {
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
      state.list.unshift(action.payload)
    },
    updateList(state, action: PayloadAction<MaintenanceRequest>) {
      const index = state.list.findIndex(
        (it) => String(it._id) === String(action.payload._id),
      )
      if (index !== -1) {
        state.list.splice(index, 1, action.payload)
      }
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
      .addCase(create.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.unshift(action.payload)
        }
      })
      .addCase(markAsResolved.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.list.findIndex(
            (it) => String(it._id) === String(action.payload?._id),
          )
          if (index !== -1) {
            state.list.splice(index, 1, action.payload)
          }
        }
      })
  },
})

export const { actions }  = maintenanceRequestSlice
