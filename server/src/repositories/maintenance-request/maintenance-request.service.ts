import { ObjectId } from 'mongodb'
import {
  MaintenanceRequest,
  MaintenanceRequestInput,
  MaintenanceRequestStatus,
  MaintenanceRequestSummary,
  MaintenanceRequestUrgency,
} from '../../graphql/type.graphql'
import { injectable, inject } from 'inversify'
import { MaintenanceRequestModel } from './maintenance-request.model'
import cron from 'node-cron'
import { PUBSUB_KEY } from '../../constants'
import { PubSub } from 'graphql-subscriptions'

@injectable()
export class MaintenanceRequestService {
  constructor(
    @inject(MaintenanceRequestModel)
    private readonly maintenanceRequestModel: MaintenanceRequestModel,
  ) {}

  async create(body: MaintenanceRequestInput): Promise<MaintenanceRequest> {
    const created = await this.maintenanceRequestModel.model.insertOne({
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
    await this.maintenanceRequestModel.model.updateOne(
      {
        _id,
      },
      {
        $set: {
          ...body,
          resolvedAt:
            body.status === MaintenanceRequestStatus.Resolved ? date : null,
          updatedAt: date,
        },
      },
    )
    return await this.findOne(_id)
  }

  async markAsResolved(_id: ObjectId): Promise<MaintenanceRequest> {
    const date = new Date()
    await this.maintenanceRequestModel.model.updateOne(
      {
        _id,
      },
      {
        $set: {
          status: MaintenanceRequestStatus.Resolved,
          resolvedAt: date,
          updatedAt: date,
        },
      },
    )
    return await this.findOne(_id)
  }

  async summary(): Promise<MaintenanceRequestSummary> {
    const result =
      await this.maintenanceRequestModel.model.aggregate<MaintenanceRequestSummary>(
        [
          {
            $facet: {
              open: [
                { $match: { status: MaintenanceRequestStatus.Open } },
                { $count: 'count' },
              ],
              urgent: [
                {
                  $match: {
                    urgency: {
                      $in: [
                        MaintenanceRequestUrgency.Urgent,
                        MaintenanceRequestUrgency.Emergency,
                      ],
                    },
                  },
                },
                { $count: 'count' },
              ],
              averageDaysToResolve: [
                {
                  $match: {
                    status: MaintenanceRequestStatus.Resolved,
                    resolvedAt: { $exists: true },
                    createdAt: { $exists: true },
                  },
                },
                {
                  $project: {
                    daysToResolve: {
                      $divide: [
                        { $subtract: ['$resolvedAt', '$createdAt'] },
                        1000 * 60 * 60 * 24,
                      ],
                    },
                  },
                },
                {
                  $group: {
                    _id: null,
                    avgDays: { $avg: '$daysToResolve' },
                  },
                },
                {
                  $project: {
                    avgDays: { $ceil: '$avgDays' },
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
        ],
      )
    return result[0] ?? { open: 0, urgent: 0, averageDaysToResolve: 0 }
  }

  async findOne(_id: ObjectId): Promise<MaintenanceRequest> {
    const maintenanceRequest =
      await this.maintenanceRequestModel.model.findById(_id)
    return maintenanceRequest
  }

  async findAll(): Promise<MaintenanceRequest[]> {
    const maintenanceRequests =
      await this.maintenanceRequestModel.model.aggregate([
        {
          $project: {
            _id: '$_id',
            title: 1,
            description: 1,
            status: 1,
            urgency: 1,
            createdAt: 1,
            resolvedAt: 1,
            updatedAt: 1,
            deletedAt: 1,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ])
    return maintenanceRequests
  }

  async delete(_id: ObjectId): Promise<boolean> {
    const result = await this.maintenanceRequestModel.model.updateOne(
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

  urgentScheduler(pubsub: PubSub<Record<string, never>>) {
    cron.schedule('0 * * * *', async () => {
      const time = new Date()
      time.setHours(time.getHours() - 6)
      try {
        await this.maintenanceRequestModel.model.updateMany(
          {
            createdAt: { $lte: time },
            urgency: MaintenanceRequestUrgency.Urgent,
            status: MaintenanceRequestStatus.Open,
          },
          {
            $set: { urgency: MaintenanceRequestUrgency.Emergency },
          },
        )
        const all = await this.findAll()
        pubsub.publish(PUBSUB_KEY['MAINTENANCE_REQUEST_RUN_SCHEDULER'], {
          maintenanceRequestRunScheduler: all,
        })
      } catch (error) {
        console.error('Error updating maintenance requests:', error)
      }
    })
  }

  lessUrgentScheduler(pubsub: PubSub<Record<string, never>>) {
    cron.schedule('0 0 * * *', async () => {
      const time = new Date()
      time.setDate(time.getDate() - 3)
      try {
        await this.maintenanceRequestModel.model.updateMany(
          {
            createdAt: { $lte: time },
            urgency: MaintenanceRequestUrgency.LessUrgent,
            status: MaintenanceRequestStatus.Open,
          },
          {
            $set: { urgency: MaintenanceRequestUrgency.Urgent },
          },
        )
        const all = await this.findAll()
        pubsub.publish(PUBSUB_KEY['MAINTENANCE_REQUEST_RUN_SCHEDULER'], {
          maintenanceRequestRunScheduler: all,
        })
      } catch (error) {
        console.error('Error updating maintenance requests:', error)
      }
    })
  }
}
