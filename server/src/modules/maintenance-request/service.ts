import { ObjectId } from 'mongodb'
import { MaintenanceRequestSchema } from '../../modules/maintenance-request/schema'
import { MaintenanceRequest, MaintenanceRequestInput, MaintenanceRequestStatus } from '../../graphql.type'

export class MaintenanceRequestService {
  private readonly schema = MaintenanceRequestSchema

  async create(body: MaintenanceRequestInput): Promise<MaintenanceRequest> {
    const date = new Date()
    const created = await this.schema.insertOne({
      ...body,
      _id: new ObjectId(),
      createdAt: date,
      updatedAt: date,
    })
    return await this.findOne(created._id)
  }

  async update(
    _id: ObjectId,
    body: MaintenanceRequestInput,
  ): Promise<MaintenanceRequest> {
    const date = new Date()
    await this.schema.updateOne(
      {
        _id,
      },
      {
        $set: {
          ...body,
          updatedAt: date,
        },
      },
    )
    return await this.findOne(_id)
  }

  async markAsResolved(_id: ObjectId) {
    const date = new Date()
    await this.schema.updateOne(
      {
        _id,
      },
      {
        $set: {
          status: MaintenanceRequestStatus.Resolved,
          updatedAt: date,
        },
      },
    )
    return await this.findOne(_id)
  }

  async findOne(_id: ObjectId): Promise<MaintenanceRequest> {
    const maintenanceRequest = await this.schema.findById(_id)
    return maintenanceRequest
  }

  async findAll(): Promise<MaintenanceRequest[]> {
    const maintenanceRequests = await this.schema.find()
    return maintenanceRequests
  }

  async delete(_id: ObjectId): Promise<boolean> {
    const result = await this.schema.updateOne(
      {
        _id,
      },
      {
        $set: {
          deletedAt: new Date(),
        },
      },
    )
    return result.modifiedCount > 0
  }
}
