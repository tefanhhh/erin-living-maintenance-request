import { configureStore } from '@reduxjs/toolkit'
import { maintenanceRequestSlice } from '@/lib/store/slices/maintenance-request'

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
