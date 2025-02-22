'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  MaintenanceRequestStatus,
  MaintenanceRequestUrgency,
} from '@/gql/graphql'

const schema = z.object({
  title: z.string().nonempty('Title is required'),
  description: z.string().optional(),
  status: z.enum(
    Object.values(MaintenanceRequestStatus) as [string, ...string[]],
  ),
  urgency: z.enum(
    Object.values(MaintenanceRequestUrgency) as [string, ...string[]],
  ),
})

type Schema = z.output<typeof schema>

const statusOptions = Object.values(MaintenanceRequestStatus)
const urgencyOptions = Object.values(MaintenanceRequestUrgency)

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      status: MaintenanceRequestStatus.Open,
      urgency: MaintenanceRequestUrgency.NoneUrgent,
    },
  })

  const onSubmit = (data: Schema) => {
    console.log('Form Data:', data)
  }

  return (
    <div className="container mx-auto px-4 sm:px-0 py-16">
      <h1 className="font-inter font-bold text-center text-foreground text-xl tracking-wider mb-4">
        Maintenance Request
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray mb-2">
            Urgency<span>*</span>
          </label>
          <select
            {...register('urgency')}
            className="w-full p-2 rounded"
            style={{
              backdropFilter: 'blur(12px)',
              boxShadow: '0px 8px 32px 0px rgba(110, 113, 145, 0.12)',
            }}
          >
            {urgencyOptions.map((it, i) => (
              <option key={i} value={it}>
                {it}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Status:</label>
          <select {...register('status')} className="w-full p-2 border rounded">
            {statusOptions.map((it, i) => (
              <option key={i} value={it}>
                {it}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Title:</label>
          <input {...register('title')} className="w-full p-2 border rounded" />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block font-semibold">Description:</label>
          <input
            {...register('description')}
            className="w-full p-2 border rounded"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}
