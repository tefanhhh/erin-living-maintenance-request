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

export const createMaintenanceRequest = gql`
  mutation CreateMaintenanceRequest($body: MaintenanceRequestInput!) {
    createMaintenanceRequest(body: $body) {
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

export const updateMaintenanceRequest = gql`
  mutation UpdateMaintenanceRequest($_id: ObjectId!, $body: MaintenanceRequestInput!) {
    updateMaintenanceRequest(_id: $_id, body: $body) {
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

export const markAsResolvedMaintenanceRequest = gql`
  mutation MarkAsResolvedMaintenanceRequest($_id: ObjectId!) {
    markAsResolvedMaintenanceRequest(_id: $_id) {
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


export const deleteMaintenanceRequest = gql`
  mutation DeleteMaintenanceRequest($_id: ObjectId!) {
    deleteMaintenanceRequest(_id: $_id)
  }
`