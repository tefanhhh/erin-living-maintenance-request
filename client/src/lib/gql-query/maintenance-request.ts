import { gql } from '@apollo/client'

const fragmentMaintenanceRequestFields = gql`
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

const fragmentPagingFields = gql`
  fragment PagingFields on Paging {
    page
    perPage
    prev
    next
    count
  }
`

export const findAllMaintenanceRequest = gql`
  query FindAllMaintenanceRequest($queryParam: QueryParamInput) {
    findAllMaintenanceRequest(queryParam: $queryParam) {
      items {
        ...MaintenanceRequestFields
      }
      paging {
        ...PagingFields
      }
    }
  }
  ${fragmentMaintenanceRequestFields}
  ${fragmentPagingFields}
`
export const findOneMaintenanceRequest = gql`
  query FindOneMaintenanceRequest($_id: ObjectId!) {
    findOneMaintenanceRequest(_id: $_id) {
      ...MaintenanceRequestFields
    }
  }
  ${fragmentMaintenanceRequestFields}
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
  ${fragmentMaintenanceRequestFields}
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
  ${fragmentMaintenanceRequestFields}
`

export const markAsResolvedMaintenanceRequest = gql`
  mutation MarkAsResolvedMaintenanceRequest($_id: ObjectId!) {
    markAsResolvedMaintenanceRequest(_id: $_id) {
      ...MaintenanceRequestFields
    }
  }
  ${fragmentMaintenanceRequestFields}
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
  ${fragmentMaintenanceRequestFields}
`

export const maintenanceRequestUpdated = gql`
  subscription MaintenanceRequestUpdated {
    maintenanceRequestUpdated {
      ...MaintenanceRequestFields
    }
  }
  ${fragmentMaintenanceRequestFields}
`

export const maintenanceRequestResolved = gql`
  subscription MaintenanceRequestResolved {
    maintenanceRequestResolved {
      ...MaintenanceRequestFields
    }
  }
  ${fragmentMaintenanceRequestFields}
`

export const maintenanceRequestDeleted = gql`
  subscription MaintenanceRequestDeleted {
    maintenanceRequestDeleted
  }
`

export const maintenanceRequestRunScheduler = gql`
  subscription MaintenanceRequestRunScheduler {
    maintenanceRequestRunScheduler
  }
`
