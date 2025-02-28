import { ObjectId } from 'mongodb'
import { Schema, model, Model } from 'mongoose'
import {
  MaintenanceRequest,
  MaintenanceRequestStatus,
  MaintenanceRequestUrgency,
} from '../../graphql/type.graphql'
import { injectable } from 'inversify'

@injectable()
export class MaintenanceRequestModel {
  private readonly schema: Schema<MaintenanceRequest>
  public readonly model: Model<MaintenanceRequest>

  constructor() {
    this.schema = new Schema<MaintenanceRequest>(
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
        createdAt: { type: Date, required: true, default: Date.now },
        updatedAt: { type: Date, required: true, default: Date.now },
        resolvedAt: { type: Date, required: false, default: null },
        deletedAt: { type: Date, required: false, default: null },
      },
      {
        timestamps: true,
        versionKey: false,
      },
    )

    this.model = model<MaintenanceRequest>(
      'MaintenanceRequest',
      this.schema,
      'maintenance_requests',
    )
  }
}
