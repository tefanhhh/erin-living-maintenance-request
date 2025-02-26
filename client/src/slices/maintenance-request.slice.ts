import {
  CreateMaintenanceRequestMutation,
  FindAllMaintenanceRequestsQuery,
  FindOneMaintenanceRequestQuery,
  MaintenanceRequest,
  MaintenanceRequestInput,
  MaintenanceRequestSummary,
  MarkAsResolvedMaintenanceRequestMutation,
  SummaryMaintenanceRequestQuery,
  UpdateMaintenanceRequestMutation,
} from '@/gql/graphql'
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import client from '@/lib/apollo.client'
import {
  createMaintenanceRequest,
  findAllMaintenanceRequests,
  findOneMaintenanceRequest,
  markAsResolvedMaintenanceRequest,
  summaryMaintenanceRequest,
  updateMaintenanceRequest,
} from '@/gql-query/maintenance-request'
import { ObjectId } from 'mongodb'

interface MaintenanceRequestState {
  summary: MaintenanceRequestSummary
  list: MaintenanceRequest[]
  detail?: MaintenanceRequest | null
}

const initialState: MaintenanceRequestState = {
  summary: {
    open: 0,
    urgent: 0,
    averageDaysToResolve: 0,
  },
  list: [],
  detail: null,
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

export const findOne = createAsyncThunk(
  'maintenance-request/findOne',
  async (_id: ObjectId) => {
    const { data } = await client.query<FindOneMaintenanceRequestQuery>({
      query: findOneMaintenanceRequest,
      variables: {
        _id,
      },
    })
    return data.findOneMaintenanceRequest
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
  async ({ _id, body }: { _id: ObjectId; body: MaintenanceRequestInput }) => {
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
      .addCase(findOne.fulfilled, (state, action) => {
        state.detail = action.payload
      })
      .addCase(create.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.unshift(action.payload)
        }
      })
      .addCase(update.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.list.findIndex(
            (it) => String(it._id) === String(action.payload?._id),
          )
          if (index !== -1) {
            state.list.splice(index, 1, action.payload)
          }
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

export const { actions } = maintenanceRequestSlice
