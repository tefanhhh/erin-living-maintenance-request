'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/lib/store'
import { create, update, findOne } from '@/lib/store/slices/maintenance-request'
import {
  Button,
  Textarea,
  Input,
  Select,
  SelectItem,
  Link,
  addToast,
  Form,
} from '@heroui/react'
import { STATUS_OPTIONS, URGENCY_OPTIONS } from '@/utils'
import { motion } from 'framer-motion'
import {
  MaintenanceRequestStatus,
  MaintenanceRequestUrgency,
} from '@/lib/gql/graphql'
import { useAppSelector } from '@/lib/store/hooks'

export default function UpdateFormComponent() {
  const dispatch = useDispatch<AppDispatch>()
  const detail = useAppSelector(
    (state: RootState) => state.maintenanceRequest.detail,
  )
  const router = useRouter()
  const searchParams = useSearchParams()

  const _id = searchParams.get('_id')

  const [loading, setLoading] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState<Set<MaintenanceRequestStatus>>(
    new Set([]),
  )
  const [urgency, setUrgency] = useState<Set<MaintenanceRequestUrgency>>(
    new Set([]),
  )

  useEffect(() => {
    if (_id) {
      dispatch(findOne(_id)).unwrap()
    }
  }, [_id, dispatch])

  useEffect(() => {
    if (detail) {
      setTitle(detail.title)
      setDescription(detail.description || '')
      setStatus(new Set([detail.status]))
      setUrgency(new Set([detail.urgency]))
    }
  }, [detail])

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (_id) {
        await dispatch(
          update({
            _id: _id,
            body: {
              title,
              description,
              status: [...status][0],
              urgency: [...urgency][0],
            },
          }),
        ).unwrap()
        addToast({
          title: 'Maintenance request updated successfully!',
          color: 'success',
        })
      } else {
        await dispatch(
          create({
            title,
            description,
            status: [...status][0],
            urgency: [...urgency][0],
          }),
        ).unwrap()
        addToast({
          title: 'Maintenance request created successfully!',
          color: 'success',
        })
      }
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Form onSubmit={onSubmit} className="max-w-[447px] mx-auto">
          <Select
            label="Urgency"
            labelPlacement="outside"
            placeholder="Select urgency"
            isRequired
            classNames={{
              label: '!text-gray text-sm after:text-gray',
              trigger: 'default-input-wrapper h-12',
              value: ![...urgency].length
                ? '!text-[#dcdcdc]'
                : '!text-foreground-500',
            }}
            className="mb-7"
            selectionMode="single"
            selectedKeys={urgency}
            defaultSelectedKeys={urgency}
            onChange={(e) =>
              setUrgency(new Set([e.target.value as MaintenanceRequestUrgency]))
            }
          >
            {URGENCY_OPTIONS.map((it) => (
              <SelectItem key={it.value}>{it.label}</SelectItem>
            ))}
          </Select>
          <Select
            label="Status"
            labelPlacement="outside"
            placeholder="Select status"
            isRequired
            classNames={{
              label: '!text-gray text-sm after:text-gray',
              trigger: 'default-input-wrapper h-12',
              value: ![...status].length
                ? '!text-[#dcdcdc]'
                : '!text-foreground-500',
            }}
            className="mb-7"
            selectionMode="single"
            selectedKeys={status}
            defaultSelectedKeys={status}
            onChange={(e) =>
              setStatus(new Set([e.target.value as MaintenanceRequestStatus]))
            }
          >
            {STATUS_OPTIONS.map((it) => (
              <SelectItem key={it.value}>{it.label}</SelectItem>
            ))}
          </Select>
          <Input
            label="Title"
            labelPlacement="outside"
            placeholder="eg. Crack in plasterboard"
            isRequired
            classNames={{
              label: '!text-gray text-sm after:text-gray',
              inputWrapper: 'default-input-wrapper h-12',
              input: '!placeholder-[#dcdcdc]',
            }}
            className="mb-7"
            value={title}
            onValueChange={setTitle}
          />
          <Textarea
            label="Description"
            labelPlacement="outside"
            placeholder="Description of your request"
            minRows={7}
            rows={7}
            classNames={{
              label: '!text-gray text-sm after:text-gray',
              inputWrapper: 'default-input-wrapper py-[14px]',
              input: '!placeholder-[#dcdcdc] !h-auto',
            }}
            value={description}
            onValueChange={setDescription}
          />
          <div className="flex items-center justify-center mt-10 w-full">
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
        </Form>
      </motion.div>
    </div>
  )
}
