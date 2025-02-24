'use client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  MaintenanceRequestStatus,
  MaintenanceRequestUrgency,
} from '@/gql/graphql'

import FormGroup from '@/components/form/Group'
import FormSelect from '@/components/form/Select'
import FormInput from '@/components/form/Input'
import FormTextarea from '@/components/form/Textarea'
import FormError from '@/components/form/Error'
import {
  maintenanceRequestSchema,
  MaintenanceRequestSchema,
} from '@/schema/maintnance-request.schema'
import Link from 'next/link'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/stores/index.store'
import { create } from '@/stores/slices/maintenance-request.slice'

function humanizeEnumText(text: string): string {
  return text
    .split('_')
    .map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    )
    .join(' ')
}

const statusOptions = Object.values(MaintenanceRequestStatus).map((it) => ({
  label: humanizeEnumText(it),
  value: it,
}))
const urgencyOptions = Object.values(MaintenanceRequestUrgency).map((it) => ({
  label: humanizeEnumText(it),
  value: it,
}))

export default function UpdatePage() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(maintenanceRequestSchema),
    defaultValues: {
      title: '',
      description: '',
      status: '',
      urgency: '',
    },
  })

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: MaintenanceRequestSchema) => {
    setLoading(true)
    try {
      await dispatch(create(data)).unwrap()
      alert('Maintenance request created successfully!')
      reset()
      router.push('/')
    } catch (err) {
      console.error('GraphQL Error:', err)
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 sm:px-0 py-16">
      <div className="flex items-center justify-center gap-8 mb-8">
        <Link href="/" className="w-5 h-5">
          <span className="icon-[heroicons--arrow-left] w-5 h-5"></span>
        </Link>
        <h1 className="font-inter font-bold text-center text-foreground text-xl tracking-wider">
          Maintenance Request
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[447px] mx-auto">
        <FormGroup label="Urgency" required className="mb-7">
          <FormSelect
            name="urgency"
            options={urgencyOptions}
            register={register}
          />
          {errors.urgency && <FormError error={errors.urgency.message} />}
        </FormGroup>
        <FormGroup label="Status" required className="mb-7">
          <FormSelect
            name="status"
            options={statusOptions}
            register={register}
          />
          {errors.status && <FormError error={errors.status.message} />}
        </FormGroup>

        <FormGroup label="Title" required className="mb-7">
          <FormInput
            name="title"
            register={register}
            placeholder="Input the title.."
          />
          {errors.title && <FormError error={errors.title.message} />}
        </FormGroup>

        <FormGroup label="Description" className="mb-7">
          <FormTextarea
            name="description"
            register={register}
            placeholder="Input the description.."
          />
          {errors.description && (
            <FormError error={errors.description.message} />
          )}
        </FormGroup>
        <div className="flex items-center justify-center mt-8">
          <button
            type="submit"
            disabled={loading}
            className="w-[268px] bg-primary text-white p-3 text-lg disabled:opacity-50 rounded-lg"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  )
}
