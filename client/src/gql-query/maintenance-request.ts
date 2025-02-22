import { gql } from "@apollo/client"

export const findAllMaintenanceRequests = gql`
  query FindAllMaintenanceRequests {
    findAllMaintenanceRequests {
      _id
      title
      description
      status
      urgency
      createdAt
      updatedAt
      deletedAt
    }
  }
`
export const findOneMaintenanceRequest = gql`
  query FindOneMaintenanceRequest($_id: ObjectId!) {
    findOneMaintenanceRequest(_id: $_id) {
      _id
      title
      description
      status
      urgency
      createdAt
      updatedAt
      deletedAt
    }
  }
`