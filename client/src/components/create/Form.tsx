'use client'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  MaintenanceRequestStatus,
  MaintenanceRequestUrgency,
} from '@/gql/graphql'
import {
  maintenanceRequestSchema,
  MaintenanceRequestSchema,
} from '@/schema/maintnance-request.schema'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/stores/index.store'
import { create } from '@/stores/slices/maintenance-request.slice'
import {
  Button,
  Textarea,
  Input,
  Select,
  SelectItem,
  Link,
  addToast,
} from '@heroui/react'

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

export default function UpdateFormComponent() {
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
      addToast({
        title: 'Maintenance request created successfully!',
        color: 'success',
      })
      reset()
      router.push('/')
    } catch (err) {
      console.error('GraphQL Error:', err)
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 sm:px-0 py-16">
      <div className="flex items-center justify-center gap-6 mb-12">
        <Link href="/" color="foreground">
          <span className="icon-[heroicons--arrow-left] w-5 h-5"></span>
        </Link>
        <h1 className="font-bold text-center text-foreground text-xl tracking-wider">
          Maintenance Request
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[447px] mx-auto">
        <Select
          {...register('urgency')}
          label="Urgency"
          labelPlacement="outside"
          placeholder="Select urgency"
          isRequired
          isInvalid={!!errors.urgency}
          errorMessage={errors.urgency?.message}
          classNames={{
            label: '!text-gray text-sm after:text-gray',
            trigger: 'default-input-wrapper h-12',
          }}
          className="mb-12"
        >
          {urgencyOptions.map((it) => (
            <SelectItem key={it.value}>{it.label}</SelectItem>
          ))}
        </Select>
        <Select
          {...register('status')}
          label="Status"
          labelPlacement="outside"
          placeholder="Select status"
          isRequired
          isInvalid={!!errors.status}
          errorMessage={errors.status?.message}
          classNames={{
            label: '!text-gray text-sm after:text-gray',
            trigger: 'default-input-wrapper h-12',
          }}
          className="mb-12"
        >
          {statusOptions.map((it) => (
            <SelectItem key={it.value}>{it.label}</SelectItem>
          ))}
        </Select>
        <Input
          {...register('title')}
          label="Title"
          labelPlacement="outside"
          placeholder="eg. Crack in plasterboard"
          isRequired
          classNames={{
            label: '!text-gray text-sm after:text-gray',
            inputWrapper: 'default-input-wrapper h-12',
          }}
          className="mb-7"
          isInvalid={!!errors.title}
          errorMessage={errors.title?.message}
        />
        <Textarea
          {...register('description')}
          label="Description"
          labelPlacement="outside"
          placeholder="Description of your request"
          minRows={7}
          rows={7}
          classNames={{
            label: '!text-gray text-sm after:text-gray',
            inputWrapper: 'default-input-wrapper py-[14px]',
            input: '!h-auto',
          }}
        />
        <div className="flex items-center justify-center mt-12">
          <Button
            type="submit"
            color="primary"
            radius="sm"
            isLoading={loading}
            className="h-12 w-[268px]"
            style={{
              backdropFilter: 'blur(12px)',
              boxShadow: '0px 16px 24px 0px rgba(160, 163, 189, 0.16)',
            }}
          >
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  )
}
