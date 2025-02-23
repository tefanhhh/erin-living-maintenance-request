import {
  MaintenanceRequestStatus,
  MaintenanceRequestUrgency,
} from '@/gql/graphql'
import { z } from 'zod'

export const maintenanceRequestSchema = z.object({
  title: z.string().nonempty('Title is required'),
  description: z.string().optional(),
  status: z.enum(
    Object.values(MaintenanceRequestStatus) as [string, ...string[]],
    {
      errorMap: () => ({
        message: 'Invalid status. Please select a valid status.',
      }),
    },
  ),
  urgency: z.enum(
    Object.values(MaintenanceRequestUrgency) as [string, ...string[]],
    {
      errorMap: () => ({
        message: 'Invalid urgency level. Please select a valid urgency.',
      }),
    },
  ),
})

export type MaintenanceRequestSchema = z.output<typeof maintenanceRequestSchema>
