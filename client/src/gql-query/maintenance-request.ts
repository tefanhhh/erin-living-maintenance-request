import { gql } from '@apollo/client'

const fragments = gql`
  fragment MaintenanceRequestFields on MaintenanceRequest {
    _id
    title
    description
    status
    urgency
    createdAt
    updatedAt
    resolvedAt
    deletedAt
  }
`

export const findAllMaintenanceRequests = gql`
  query FindAllMaintenanceRequests {
    findAllMaintenanceRequests {
      ...MaintenanceRequestFields
    }
  }
  ${fragments}
`
export const findOneMaintenanceRequest = gql`
  query FindOneMaintenanceRequest($_id: ObjectId!) {
    findOneMaintenanceRequest(_id: $_id) {
      ...MaintenanceRequestFields
    }
  }
  ${fragments}
`

export const summaryMaintenanceRequest = gql`
  query SummaryMaintenanceRequest {
    summaryMaintenanceRequest {
      averageDaysToResolve
      open
      urgent
    }
  }
`

export const createMaintenanceRequest = gql`
  mutation CreateMaintenanceRequest($body: MaintenanceRequestInput!) {
    createMaintenanceRequest(body: $body) {
      ...MaintenanceRequestFields
    }
  }
  ${fragments}
`

export const updateMaintenanceRequest = gql`
  mutation UpdateMaintenanceRequest(
    $_id: ObjectId!
    $body: MaintenanceRequestInput!
  ) {
    updateMaintenanceRequest(_id: $_id, body: $body) {
      ...MaintenanceRequestFields
    }
  }
  ${fragments}
`

export const markAsResolvedMaintenanceRequest = gql`
  mutation MarkAsResolvedMaintenanceRequest($_id: ObjectId!) {
    markAsResolvedMaintenanceRequest(_id: $_id) {
      ...MaintenanceRequestFields
    }
  }
  ${fragments}
`

export const deleteMaintenanceRequest = gql`
  mutation DeleteMaintenanceRequest($_id: ObjectId!) {
    deleteMaintenanceRequest(_id: $_id)
  }
`

export const maintenanceRequestCreated = gql`
  subscription MaintenanceRequestCreated {
    maintenanceRequestCreated {
      ...MaintenanceRequestFields
    }
  }
  ${fragments}
`

export const maintenanceRequestUpdated = gql`
  subscription MaintenanceRequestUpdated {
    maintenanceRequestUpdated {
      ...MaintenanceRequestFields
    }
  }
  ${fragments}
`

export const maintenanceRequestResolved = gql`
  subscription MaintenanceRequestResolved {
    maintenanceRequestResolved {
      ...MaintenanceRequestFields
    }
  }
  ${fragments}
`

export const maintenanceRequestDeleted = gql`
  subscription MaintenanceRequestDeleted {
    maintenanceRequestDeleted
  }
`

export const maintenanceRequestRunScheduler = gql`
  subscription MaintenanceRequestRunScheduler {
    maintenanceRequestRunScheduler {
      ...MaintenanceRequestFields
    }
  }
  ${fragments}
`
