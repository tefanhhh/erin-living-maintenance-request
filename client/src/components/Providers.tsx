'use client'

import { Provider } from 'react-redux'
import { store } from '@/stores/index.store'

export default function ProvidersComponent({
  children,
}: {
  children: React.ReactNode
}) {
  return <Provider store={store}>{children}</Provider>
}
