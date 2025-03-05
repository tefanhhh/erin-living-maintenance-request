/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never }
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never
    }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /** MongoDB ObjectId custom scalar */
  ObjectId: { input: any; output: any }
  /** Date custom scalar type */
  Date: { input: any; output: any }
}

export enum MaintenanceRequestStatus {
  Open = 'OPEN',
  Resolved = 'RESOLVED',
}

export enum MaintenanceRequestUrgency {
  Urgent = 'URGENT',
  NoneUrgent = 'NONE_URGENT',
  LessUrgent = 'LESS_URGENT',
  Emergency = 'EMERGENCY',
}

export type MaintenanceRequestInput = {
  title: Scalars['String']['input']
  description?: InputMaybe<Scalars['String']['input']>
  status: MaintenanceRequestStatus
  urgency: MaintenanceRequestUrgency
}

export type MaintenanceRequest = {
  __typename?: 'MaintenanceRequest'
  _id: Scalars['ObjectId']['output']
  title: Scalars['String']['output']
  description?: Maybe<Scalars['String']['output']>
  status: MaintenanceRequestStatus
  urgency: MaintenanceRequestUrgency
  createdAt: Scalars['Date']['output']
  updatedAt: Scalars['Date']['output']
  resolvedAt?: Maybe<Scalars['Date']['output']>
  deletedAt?: Maybe<Scalars['Date']['output']>
}

export type PaginatedMaintenanceRequests = {
  __typename?: 'PaginatedMaintenanceRequests'
  items: Array<MaintenanceRequest>
  paging: Paging
}

export type MaintenanceRequestSummary = {
  __typename?: 'MaintenanceRequestSummary'
  open?: Maybe<Scalars['Int']['output']>
  urgent?: Maybe<Scalars['Int']['output']>
  averageDaysToResolve?: Maybe<Scalars['Int']['output']>
}

export type Query = {
  __typename?: 'Query'
  findOneMaintenanceRequest?: Maybe<MaintenanceRequest>
  findAllMaintenanceRequest: PaginatedMaintenanceRequests
  summaryMaintenanceRequest: MaintenanceRequestSummary
}

export type QueryFindOneMaintenanceRequestArgs = {
  _id: Scalars['ObjectId']['input']
}

export type QueryFindAllMaintenanceRequestArgs = {
  queryParam?: InputMaybe<QueryParamInput>
}

export type Mutation = {
  __typename?: 'Mutation'
  createMaintenanceRequest?: Maybe<MaintenanceRequest>
  updateMaintenanceRequest?: Maybe<MaintenanceRequest>
  markAsResolvedMaintenanceRequest?: Maybe<MaintenanceRequest>
  deleteMaintenanceRequest?: Maybe<Scalars['Boolean']['output']>
}

export type MutationCreateMaintenanceRequestArgs = {
  body: MaintenanceRequestInput
}

export type MutationUpdateMaintenanceRequestArgs = {
  _id: Scalars['ObjectId']['input']
  body: MaintenanceRequestInput
}

export type MutationMarkAsResolvedMaintenanceRequestArgs = {
  _id: Scalars['ObjectId']['input']
}

export type MutationDeleteMaintenanceRequestArgs = {
  _id: Scalars['ObjectId']['input']
}

export type Subscription = {
  __typename?: 'Subscription'
  maintenanceRequestCreated: MaintenanceRequest
  maintenanceRequestUpdated: MaintenanceRequest
  maintenanceRequestResolved: MaintenanceRequest
  maintenanceRequestDeleted: Scalars['Boolean']['output']
  maintenanceRequestRunScheduler: Scalars['Boolean']['output']
}

export enum Sort {
  Latest = 'LATEST',
  Oldest = 'OLDEST',
}

export type QueryParamInput = {
  page: Scalars['Int']['input']
  perPage: Scalars['Int']['input']
  sort: Sort
  keyword: Scalars['String']['input']
}

export type Paging = {
  __typename?: 'Paging'
  count: Scalars['Int']['output']
  next: Scalars['Boolean']['output']
  prev: Scalars['Boolean']['output']
  page: Scalars['Int']['output']
  perPage: Scalars['Int']['output']
}

export type MaintenanceRequestFieldsFragment = {
  __typename?: 'MaintenanceRequest'
  _id: any
  title: string
  description?: string | null
  status: MaintenanceRequestStatus
  urgency: MaintenanceRequestUrgency
  createdAt: any
  updatedAt: any
  resolvedAt?: any | null
  deletedAt?: any | null
}

export type PagingFieldsFragment = {
  __typename?: 'Paging'
  page: number
  perPage: number
  prev: boolean
  next: boolean
  count: number
}

export type FindAllMaintenanceRequestQueryVariables = Exact<{
  queryParam?: InputMaybe<QueryParamInput>
}>

export type FindAllMaintenanceRequestQuery = {
  __typename?: 'Query'
  findAllMaintenanceRequest: {
    __typename?: 'PaginatedMaintenanceRequests'
    items: Array<{
      __typename?: 'MaintenanceRequest'
      _id: any
      title: string
      description?: string | null
      status: MaintenanceRequestStatus
      urgency: MaintenanceRequestUrgency
      createdAt: any
      updatedAt: any
      resolvedAt?: any | null
      deletedAt?: any | null
    }>
    paging: {
      __typename?: 'Paging'
      page: number
      perPage: number
      prev: boolean
      next: boolean
      count: number
    }
  }
}

export type FindOneMaintenanceRequestQueryVariables = Exact<{
  _id: Scalars['ObjectId']['input']
}>

export type FindOneMaintenanceRequestQuery = {
  __typename?: 'Query'
  findOneMaintenanceRequest?: {
    __typename?: 'MaintenanceRequest'
    _id: any
    title: string
    description?: string | null
    status: MaintenanceRequestStatus
    urgency: MaintenanceRequestUrgency
    createdAt: any
    updatedAt: any
    resolvedAt?: any | null
    deletedAt?: any | null
  } | null
}

export type SummaryMaintenanceRequestQueryVariables = Exact<{
  [key: string]: never
}>

export type SummaryMaintenanceRequestQuery = {
  __typename?: 'Query'
  summaryMaintenanceRequest: {
    __typename?: 'MaintenanceRequestSummary'
    averageDaysToResolve?: number | null
    open?: number | null
    urgent?: number | null
  }
}

export type CreateMaintenanceRequestMutationVariables = Exact<{
  body: MaintenanceRequestInput
}>

export type CreateMaintenanceRequestMutation = {
  __typename?: 'Mutation'
  createMaintenanceRequest?: {
    __typename?: 'MaintenanceRequest'
    _id: any
    title: string
    description?: string | null
    status: MaintenanceRequestStatus
    urgency: MaintenanceRequestUrgency
    createdAt: any
    updatedAt: any
    resolvedAt?: any | null
    deletedAt?: any | null
  } | null
}

export type UpdateMaintenanceRequestMutationVariables = Exact<{
  _id: Scalars['ObjectId']['input']
  body: MaintenanceRequestInput
}>

export type UpdateMaintenanceRequestMutation = {
  __typename?: 'Mutation'
  updateMaintenanceRequest?: {
    __typename?: 'MaintenanceRequest'
    _id: any
    title: string
    description?: string | null
    status: MaintenanceRequestStatus
    urgency: MaintenanceRequestUrgency
    createdAt: any
    updatedAt: any
    resolvedAt?: any | null
    deletedAt?: any | null
  } | null
}

export type MarkAsResolvedMaintenanceRequestMutationVariables = Exact<{
  _id: Scalars['ObjectId']['input']
}>

export type MarkAsResolvedMaintenanceRequestMutation = {
  __typename?: 'Mutation'
  markAsResolvedMaintenanceRequest?: {
    __typename?: 'MaintenanceRequest'
    _id: any
    title: string
    description?: string | null
    status: MaintenanceRequestStatus
    urgency: MaintenanceRequestUrgency
    createdAt: any
    updatedAt: any
    resolvedAt?: any | null
    deletedAt?: any | null
  } | null
}

export type DeleteMaintenanceRequestMutationVariables = Exact<{
  _id: Scalars['ObjectId']['input']
}>

export type DeleteMaintenanceRequestMutation = {
  __typename?: 'Mutation'
  deleteMaintenanceRequest?: boolean | null
}

export type MaintenanceRequestCreatedSubscriptionVariables = Exact<{
  [key: string]: never
}>

export type MaintenanceRequestCreatedSubscription = {
  __typename?: 'Subscription'
  maintenanceRequestCreated: {
    __typename?: 'MaintenanceRequest'
    _id: any
    title: string
    description?: string | null
    status: MaintenanceRequestStatus
    urgency: MaintenanceRequestUrgency
    createdAt: any
    updatedAt: any
    resolvedAt?: any | null
    deletedAt?: any | null
  }
}

export type MaintenanceRequestUpdatedSubscriptionVariables = Exact<{
  [key: string]: never
}>

export type MaintenanceRequestUpdatedSubscription = {
  __typename?: 'Subscription'
  maintenanceRequestUpdated: {
    __typename?: 'MaintenanceRequest'
    _id: any
    title: string
    description?: string | null
    status: MaintenanceRequestStatus
    urgency: MaintenanceRequestUrgency
    createdAt: any
    updatedAt: any
    resolvedAt?: any | null
    deletedAt?: any | null
  }
}

export type MaintenanceRequestResolvedSubscriptionVariables = Exact<{
  [key: string]: never
}>

export type MaintenanceRequestResolvedSubscription = {
  __typename?: 'Subscription'
  maintenanceRequestResolved: {
    __typename?: 'MaintenanceRequest'
    _id: any
    title: string
    description?: string | null
    status: MaintenanceRequestStatus
    urgency: MaintenanceRequestUrgency
    createdAt: any
    updatedAt: any
    resolvedAt?: any | null
    deletedAt?: any | null
  }
}

export type MaintenanceRequestDeletedSubscriptionVariables = Exact<{
  [key: string]: never
}>

export type MaintenanceRequestDeletedSubscription = {
  __typename?: 'Subscription'
  maintenanceRequestDeleted: boolean
}

export type MaintenanceRequestRunSchedulerSubscriptionVariables = Exact<{
  [key: string]: never
}>

export type MaintenanceRequestRunSchedulerSubscription = {
  __typename?: 'Subscription'
  maintenanceRequestRunScheduler: boolean
}

export const MaintenanceRequestFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MaintenanceRequestFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'MaintenanceRequest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'urgency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'resolvedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'deletedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MaintenanceRequestFieldsFragment, unknown>
export const PagingFieldsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PagingFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Paging' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'page' } },
          { kind: 'Field', name: { kind: 'Name', value: 'perPage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'prev' } },
          { kind: 'Field', name: { kind: 'Name', value: 'next' } },
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PagingFieldsFragment, unknown>
export const FindAllMaintenanceRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FindAllMaintenanceRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'queryParam' },
          },
          type: {
            kind: 'NamedType',
            name: { kind: 'Name', value: 'QueryParamInput' },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'findAllMaintenanceRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'queryParam' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'queryParam' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: {
                          kind: 'Name',
                          value: 'MaintenanceRequestFields',
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'paging' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'PagingFields' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MaintenanceRequestFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'MaintenanceRequest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'urgency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'resolvedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'deletedAt' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PagingFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Paging' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'page' } },
          { kind: 'Field', name: { kind: 'Name', value: 'perPage' } },
          { kind: 'Field', name: { kind: 'Name', value: 'prev' } },
          { kind: 'Field', name: { kind: 'Name', value: 'next' } },
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindAllMaintenanceRequestQuery,
  FindAllMaintenanceRequestQueryVariables
>
export const FindOneMaintenanceRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'FindOneMaintenanceRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: '_id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ObjectId' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'findOneMaintenanceRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: '_id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MaintenanceRequestFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MaintenanceRequestFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'MaintenanceRequest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'urgency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'resolvedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'deletedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  FindOneMaintenanceRequestQuery,
  FindOneMaintenanceRequestQueryVariables
>
export const SummaryMaintenanceRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'SummaryMaintenanceRequest' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'summaryMaintenanceRequest' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'averageDaysToResolve' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'open' } },
                { kind: 'Field', name: { kind: 'Name', value: 'urgent' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SummaryMaintenanceRequestQuery,
  SummaryMaintenanceRequestQueryVariables
>
export const CreateMaintenanceRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateMaintenanceRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'body' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'MaintenanceRequestInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createMaintenanceRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'body' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'body' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MaintenanceRequestFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MaintenanceRequestFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'MaintenanceRequest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'urgency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'resolvedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'deletedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateMaintenanceRequestMutation,
  CreateMaintenanceRequestMutationVariables
>
export const UpdateMaintenanceRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateMaintenanceRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: '_id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ObjectId' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'body' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'MaintenanceRequestInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateMaintenanceRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: '_id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'body' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'body' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MaintenanceRequestFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MaintenanceRequestFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'MaintenanceRequest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'urgency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'resolvedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'deletedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateMaintenanceRequestMutation,
  UpdateMaintenanceRequestMutationVariables
>
export const MarkAsResolvedMaintenanceRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'MarkAsResolvedMaintenanceRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: '_id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ObjectId' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'markAsResolvedMaintenanceRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: '_id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MaintenanceRequestFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MaintenanceRequestFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'MaintenanceRequest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'urgency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'resolvedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'deletedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MarkAsResolvedMaintenanceRequestMutation,
  MarkAsResolvedMaintenanceRequestMutationVariables
>
export const DeleteMaintenanceRequestDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteMaintenanceRequest' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: '_id' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'ObjectId' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteMaintenanceRequest' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: '_id' },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteMaintenanceRequestMutation,
  DeleteMaintenanceRequestMutationVariables
>
export const MaintenanceRequestCreatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'MaintenanceRequestCreated' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'maintenanceRequestCreated' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MaintenanceRequestFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MaintenanceRequestFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'MaintenanceRequest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'urgency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'resolvedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'deletedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MaintenanceRequestCreatedSubscription,
  MaintenanceRequestCreatedSubscriptionVariables
>
export const MaintenanceRequestUpdatedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'MaintenanceRequestUpdated' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'maintenanceRequestUpdated' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MaintenanceRequestFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MaintenanceRequestFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'MaintenanceRequest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'urgency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'resolvedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'deletedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MaintenanceRequestUpdatedSubscription,
  MaintenanceRequestUpdatedSubscriptionVariables
>
export const MaintenanceRequestResolvedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'MaintenanceRequestResolved' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'maintenanceRequestResolved' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'MaintenanceRequestFields' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MaintenanceRequestFields' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'MaintenanceRequest' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: '_id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'status' } },
          { kind: 'Field', name: { kind: 'Name', value: 'urgency' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'resolvedAt' } },
          { kind: 'Field', name: { kind: 'Name', value: 'deletedAt' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MaintenanceRequestResolvedSubscription,
  MaintenanceRequestResolvedSubscriptionVariables
>
export const MaintenanceRequestDeletedDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'MaintenanceRequestDeleted' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'maintenanceRequestDeleted' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MaintenanceRequestDeletedSubscription,
  MaintenanceRequestDeletedSubscriptionVariables
>
export const MaintenanceRequestRunSchedulerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'subscription',
      name: { kind: 'Name', value: 'MaintenanceRequestRunScheduler' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'maintenanceRequestRunScheduler' },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  MaintenanceRequestRunSchedulerSubscription,
  MaintenanceRequestRunSchedulerSubscriptionVariables
>
