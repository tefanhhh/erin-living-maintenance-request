import { MaintenanceRequest, MaintenanceRequestSummary } from '@/gql/graphql'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const maintenanceRequestSlice = createSlice({
  name: 'maintenance-request',
  initialState,
  reducers: {
    setSummary(state, action: PayloadAction<MaintenanceRequestSummary>) {
      state.summary.open = action.payload.open || 0
      state.summary.urgent = action.payload.urgent || 0
      state.summary.averageDaysToResolve =
        action.payload.averageDaysToResolve || 0
    },
    setList(state, action: PayloadAction<MaintenanceRequest[]>) {
      state.list = action.payload
    },
    unshiftList(state, action: PayloadAction<MaintenanceRequest>) {
      state.list?.unshift(action.payload)
    },
    updateListItem(state, action: PayloadAction<MaintenanceRequest>) {
      const index = state.list?.findIndex(
        (it) => String(it?._id) === String(action.payload?._id),
      )
      if (index !== -1) {
        state.list.splice(index, 1, action.payload)
      }
    },
  },
})

export const maintenanceRequestActions = maintenanceRequestSlice.actions
