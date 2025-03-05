import MaintenanceRequest from '@/components/partials/home/Index'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Erin Living | Maintenance Request',
  description: 'Erin Living Maintenance Request Web App',
}

export default async function Page() {
  return <MaintenanceRequest />
}
