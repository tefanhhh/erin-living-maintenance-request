import { MaintenanceRequestService } from "../../modules/maintenance-request/service";
import { Resolvers } from "../../graphql.type";
import { DateScalar, ObjectIdScalar } from "../../scalars";

const maintenanceRequestService = new MaintenanceRequestService();

export const maintenanceRequestResolvers: Resolvers = {
  ObjectId: ObjectIdScalar,
  Date: DateScalar,
  Query: {
    findOneMaintenanceRequest: async (_, { _id }) => {
      return await maintenanceRequestService.findOne(_id);
    },
    findAllMaintenanceRequests: async () => {
      return await maintenanceRequestService.findAll();
    }
  },
  Mutation: {
    createMaintenanceRequest: async (_, { body }) => {
      return await maintenanceRequestService.create(body);
    },
    updateMaintenanceRequest: async (_, { _id, body }) => {
      return await maintenanceRequestService.update(_id, body);
    },
    deleteMaintenanceRequest: async (_, { _id }) => {
      return await maintenanceRequestService.delete(_id);
    }
  }
}