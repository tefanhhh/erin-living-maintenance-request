import { ObjectId } from 'mongodb'
import { MaintenanceRequestSchema } from '../../modules/maintenance-request/schema'
import {
  MaintenanceRequest,
  MaintenanceRequestInput,
  MaintenanceRequestStatus,
  MaintenanceRequestSummary,
  MaintenanceRequestUrgency,
} from '../../graphql.type'

export class MaintenanceRequestService {
  private readonly schema = MaintenanceRequestSchema

  async create(body: MaintenanceRequestInput): Promise<MaintenanceRequest> {
    const created = await this.schema.insertOne({
      ...body,
      _id: new ObjectId(),
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

  async summary(): Promise<MaintenanceRequestSummary> {
    const result = await this.schema.aggregate<MaintenanceRequestSummary>([
      {
        $facet: {
          open: [
            { $match: { status: MaintenanceRequestStatus.Open } },
            { $count: 'count' },
          ],
          urgent: [
            { $match: { urgency: MaintenanceRequestUrgency.Urgent } },
            { $count: 'count' },
          ],
          averageDaysToResolve: [
            {
              $match: {
                status: MaintenanceRequestStatus.Resolved,
                updatedAt: { $exists: true },
                createdAt: { $exists: true },
              },
            },
            {
              $project: {
                daysToResolve: {
                  $floor: {
                    $divide: [
                      { $subtract: ['$updatedAt', '$createdAt'] },
                      1000 * 60 * 60 * 24,
                    ],
                  },
                },
              },
            },
            {
              $group: {
                _id: null,
                avgDays: { $avg: '$daysToResolve' },
              },
            },
          ],
        },
      },
      {
        $project: {
          open: { $arrayElemAt: ['$open.count', 0] },
          urgent: { $arrayElemAt: ['$urgent.count', 0] },
          averageDaysToResolve: {
            $arrayElemAt: ['$averageDaysToResolve.avgDays', 0],
          },
        },
      },
    ])
    return result[0] ?? { open: 0, urgent: 0, averageDaysToResolve: 0 }
  }

  async findOne(_id: ObjectId): Promise<MaintenanceRequest> {
    const maintenanceRequest = await this.schema.findById(_id)
    return maintenanceRequest
  }

  async findAll(): Promise<MaintenanceRequest[]> {
    const maintenanceRequests = await this.schema.aggregate([
      {
        $project: {
          _id: '$_id',
          title: 1,
          description: 1,
          status: 1,
          urgency: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        }
      },
      {
        $sort: {
          updatedAt: -1,
        },
      }
    ])
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
