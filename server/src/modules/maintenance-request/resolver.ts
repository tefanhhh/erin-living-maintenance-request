import { MaintenanceRequestService } from '../../modules/maintenance-request/service'
import { Resolvers } from '../../graphql.type'
import { DateScalar, ObjectIdScalar } from '../../scalars'
import { PubSub } from 'graphql-subscriptions'

const maintenanceRequestService = new MaintenanceRequestService()
const pubsub = new PubSub()
const PUBSUB_KEY = {
  MAINTENANCE_REQUEST_CREATED: 'MAINTENANCE_REQUEST_CREATED',
  MAINTENANCE_REQUEST_UPDATED: 'MAINTENANCE_REQUEST_UPDATED',
  MAINTENANCE_REQUEST_RESOLVED: 'MAINTENANCE_REQUEST_RESOLVED',
  MAINTENANCE_REQUEST_DELETED: 'MAINTENANCE_REQUEST_DELETED',
}

export const maintenanceRequestResolvers: Resolvers = {
  ObjectId: ObjectIdScalar,
  Date: DateScalar,
  Query: {
    findOneMaintenanceRequest: async (_, { _id }) => {
      return await maintenanceRequestService.findOne(_id)
    },
    findAllMaintenanceRequests: async () => {
      return await maintenanceRequestService.findAll()
    },
    summaryMaintenanceRequest: async () => {
      return await maintenanceRequestService.summary()
    }
  },
  Mutation: {
    createMaintenanceRequest: async (_, { body }) => {
      const result = await maintenanceRequestService.create(body)
      pubsub.publish(PUBSUB_KEY['MAINTENANCE_REQUEST_CREATED'], {
        maintenanceRequestCreated: result,
      })
      return result
    },
    updateMaintenanceRequest: async (_, { _id, body }) => {
      const result = await maintenanceRequestService.update(_id, body)
      pubsub.publish(PUBSUB_KEY['MAINTENANCE_REQUEST_UPDATED'], {
        maintenanceRequestUpdated: result,
      })
      return result
    },
    markAsResolvedMaintenanceRequest: async (_, { _id }) => {
      const result = await maintenanceRequestService.markAsResolved(_id)
      pubsub.publish(PUBSUB_KEY['MAINTENANCE_REQUEST_RESOLVED'], {
        maintenanceRequestResolved: result,
      })
      return result
    },
    deleteMaintenanceRequest: async (_, { _id }) => {
      const result = await maintenanceRequestService.delete(_id)
      pubsub.publish(PUBSUB_KEY['MAINTENANCE_REQUEST_DELETED'], {
        maintenanceRequestDeleted: result,
      })
      return result
    },
  },
  Subscription: {
    maintenanceRequestCreated: {
      subscribe: () =>
        pubsub.asyncIterableIterator(PUBSUB_KEY['MAINTENANCE_REQUEST_CREATED']),
    },
    maintenanceRequestUpdated: {
      subscribe: () =>
        pubsub.asyncIterableIterator(PUBSUB_KEY['MAINTENANCE_REQUEST_UPDATED']),
    },
    maintenanceRequestResolved: {
      subscribe: () =>
        pubsub.asyncIterableIterator(PUBSUB_KEY['MAINTENANCE_REQUEST_RESOLVED']),
    },
    maintenanceRequestDeleted: {
      subscribe: () =>
        pubsub.asyncIterableIterator(PUBSUB_KEY['MAINTENANCE_REQUEST_DELETED']),
    },
  },
}
