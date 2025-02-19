import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'
import {
  MaintenanceRequest,
  MaintenanceRequestStatus,
  MaintenanceRequestUrgency,
} from '../../graphql.type'

const schema = new Schema<MaintenanceRequest>(
  {
    _id: { type: ObjectId, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: {
      type: String,
      enum: Object.values(MaintenanceRequestStatus),
      required: true,
    },
    urgency: {
      type: String,
      enum: Object.values(MaintenanceRequestUrgency),
      required: true,
    },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true },
    deletedAt: { type: String, required: false, default: null },
  },
  {
    timestamps: true,
    versionKey: false,
  },
)

export const MaintenanceRequestSchema = model<MaintenanceRequest>(
  'MaintenanceRequest',
  schema,
  'maintenance_requests',
)
