import { configureStore } from '@reduxjs/toolkit'
import { maintenanceRequestSlice } from '@/lib/slices/maintenance-request.slice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      maintenanceRequest: maintenanceRequestSlice.reducer,
    },
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
