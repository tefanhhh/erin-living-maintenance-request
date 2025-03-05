'use client'

import { Provider } from 'react-redux'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { store } from '@/lib/stores/index.store'

interface ProvidersComponentProps {
  children: React.ReactNode
}

export default function ProvidersComponent({
  children,
}: ProvidersComponentProps) {
  return (
    <Provider store={store}>
      <HeroUIProvider>
        <ToastProvider placement="top-right" toastOffset={60} />
        {children}
      </HeroUIProvider>
    </Provider>
  )
}
