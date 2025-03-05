import UpdateForm from '@/components/partials/update/Form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create / Update Request - Erin Living | Maintenance Request',
  description:
    'Create / Update Request - Erin Living Maintenance Request Web App',
}

export default function UpdatePage() {
  return <UpdateForm />
}
