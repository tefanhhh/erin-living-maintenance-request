import { ObjectId } from 'mongodb'
import { MaintenanceRequestSchema } from '../../modules/maintenance-request/schema'
import { MaintenanceRequest, MaintenanceRequestInput } from '../../graphql.type'

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
    _id: string,
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

  async findOne(id: string): Promise<MaintenanceRequest> {
    const maintenanceRequest = await this.schema.findById(id)
    return maintenanceRequest
  }

  async findAll(): Promise<MaintenanceRequest[]> {
    const maintenanceRequests = await this.schema.find()
    return maintenanceRequests
  }

  async delete(_id: string): Promise<boolean> {
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
