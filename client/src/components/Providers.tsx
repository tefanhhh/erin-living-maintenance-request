'use client'

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { HeroUIProvider, ToastProvider } from '@heroui/react'
import { makeStore, AppStore } from '@/lib/store'

interface ProvidersComponentProps {
  children: React.ReactNode
}

export default function ProvidersComponent({
  children,
}: ProvidersComponentProps) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
  }

  return (
    <Provider store={storeRef.current}>
      <HeroUIProvider>
        <ToastProvider placement="top-right" toastOffset={60} />
        {children}
      </HeroUIProvider>
    </Provider>
  )
}
