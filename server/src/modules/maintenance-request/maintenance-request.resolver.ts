import { MaintenanceRequestService } from './maintenance-request.service'
import { Resolvers } from '../../graphql/type.graphql'
import { DateScalar, ObjectIdScalar } from '../../graphql/scalars.graphql'
import { PubSub } from 'graphql-subscriptions'
import { inject, injectable } from 'inversify'
import { PUBSUB_KEY } from '../../constants'

@injectable()
export class MaintenanceRequestResolver {
  private readonly pubsub: PubSub<Record<string, never>>

  constructor(
    @inject(MaintenanceRequestService)
    private readonly maintenanceRequestService: MaintenanceRequestService,
  ) {
    this.pubsub = new PubSub()
  }

  startScheduler() {
    this.maintenanceRequestService.lessUrgentScheduler(this.pubsub)
    this.maintenanceRequestService.urgentScheduler(this.pubsub)
  }

  getResolvers(): Resolvers {
    return {
      ObjectId: ObjectIdScalar,
      Date: DateScalar,
      Query: {
        findOneMaintenanceRequest: async (_, { _id }) => {
          return await this.maintenanceRequestService.findOne(_id)
        },
        findAllMaintenanceRequest: async (_, { queryParam }) => {
          return await this.maintenanceRequestService.findAll(queryParam)
        },
        summaryMaintenanceRequest: async () => {
          return await this.maintenanceRequestService.summary()
        },
      },
      Mutation: {
        createMaintenanceRequest: async (_, { body }) => {
          const result = await this.maintenanceRequestService.create(body)
          this.pubsub.publish(PUBSUB_KEY['MAINTENANCE_REQUEST_CREATED'], {
            maintenanceRequestCreated: result,
          })
          return result
        },
        updateMaintenanceRequest: async (_, { _id, body }) => {
          const result = await this.maintenanceRequestService.update(_id, body)
          this.pubsub.publish(PUBSUB_KEY['MAINTENANCE_REQUEST_UPDATED'], {
            maintenanceRequestUpdated: result,
          })
          return result
        },
        markAsResolvedMaintenanceRequest: async (_, { _id }) => {
          const result =
            await this.maintenanceRequestService.markAsResolved(_id)
          this.pubsub.publish(PUBSUB_KEY['MAINTENANCE_REQUEST_RESOLVED'], {
            maintenanceRequestResolved: result,
          })
          return result
        },
        deleteMaintenanceRequest: async (_, { _id }) => {
          const result = await this.maintenanceRequestService.delete(_id)
          this.pubsub.publish(PUBSUB_KEY['MAINTENANCE_REQUEST_DELETED'], {
            maintenanceRequestDeleted: result,
          })
          return result
        },
      },
      Subscription: {
        maintenanceRequestCreated: {
          subscribe: () =>
            this.pubsub.asyncIterableIterator(
              PUBSUB_KEY['MAINTENANCE_REQUEST_CREATED'],
            ),
        },
        maintenanceRequestUpdated: {
          subscribe: () =>
            this.pubsub.asyncIterableIterator(
              PUBSUB_KEY['MAINTENANCE_REQUEST_UPDATED'],
            ),
        },
        maintenanceRequestResolved: {
          subscribe: () =>
            this.pubsub.asyncIterableIterator(
              PUBSUB_KEY['MAINTENANCE_REQUEST_RESOLVED'],
            ),
        },
        maintenanceRequestDeleted: {
          subscribe: () =>
            this.pubsub.asyncIterableIterator(
              PUBSUB_KEY['MAINTENANCE_REQUEST_DELETED'],
            ),
        },
        maintenanceRequestRunScheduler: {
          subscribe: () =>
            this.pubsub.asyncIterableIterator(
              PUBSUB_KEY['MAINTENANCE_REQUEST_RUN_SCHEDULER'],
            ),
        },
      },
    }
  }
}
