'use client'

import { Provider } from 'react-redux'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { store } from '@/stores/index.store'

export default function ProvidersComponent({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Provider store={store}>
      <HeroUIProvider>
        <ToastProvider placement="top-right" toastOffset={60} />
        {children}
      </HeroUIProvider>
    </Provider>
  )
}
