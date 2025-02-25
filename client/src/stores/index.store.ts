import { configureStore } from '@reduxjs/toolkit'
import { maintenanceRequestSlice } from '@/slices/maintenance-request.slice'

export const store = configureStore({
  reducer: {
    maintenanceRequest: maintenanceRequestSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
