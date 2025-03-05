/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment MaintenanceRequestFields on MaintenanceRequest {\n    _id\n    title\n    description\n    status\n    urgency\n    createdAt\n    updatedAt\n    resolvedAt\n    deletedAt\n  }\n": typeof types.MaintenanceRequestFieldsFragmentDoc,
    "\n  fragment PagingFields on Paging {\n    page\n    perPage\n    prev\n    next\n    count\n  }\n": typeof types.PagingFieldsFragmentDoc,
    "\n  query FindAllMaintenanceRequest($queryParam: QueryParamInput) {\n    findAllMaintenanceRequest(queryParam: $queryParam) {\n      items {\n        ...MaintenanceRequestFields\n      }\n      paging {\n        ...PagingFields\n      }\n    }\n  }\n  \n  \n": typeof types.FindAllMaintenanceRequestDocument,
    "\n  query FindOneMaintenanceRequest($_id: ObjectId!) {\n    findOneMaintenanceRequest(_id: $_id) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": typeof types.FindOneMaintenanceRequestDocument,
    "\n  query SummaryMaintenanceRequest {\n    summaryMaintenanceRequest {\n      averageDaysToResolve\n      open\n      urgent\n    }\n  }\n": typeof types.SummaryMaintenanceRequestDocument,
    "\n  mutation CreateMaintenanceRequest($body: MaintenanceRequestInput!) {\n    createMaintenanceRequest(body: $body) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": typeof types.CreateMaintenanceRequestDocument,
    "\n  mutation UpdateMaintenanceRequest(\n    $_id: ObjectId!\n    $body: MaintenanceRequestInput!\n  ) {\n    updateMaintenanceRequest(_id: $_id, body: $body) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": typeof types.UpdateMaintenanceRequestDocument,
    "\n  mutation MarkAsResolvedMaintenanceRequest($_id: ObjectId!) {\n    markAsResolvedMaintenanceRequest(_id: $_id) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": typeof types.MarkAsResolvedMaintenanceRequestDocument,
    "\n  mutation DeleteMaintenanceRequest($_id: ObjectId!) {\n    deleteMaintenanceRequest(_id: $_id)\n  }\n": typeof types.DeleteMaintenanceRequestDocument,
    "\n  subscription MaintenanceRequestCreated {\n    maintenanceRequestCreated {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": typeof types.MaintenanceRequestCreatedDocument,
    "\n  subscription MaintenanceRequestUpdated {\n    maintenanceRequestUpdated {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": typeof types.MaintenanceRequestUpdatedDocument,
    "\n  subscription MaintenanceRequestResolved {\n    maintenanceRequestResolved {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": typeof types.MaintenanceRequestResolvedDocument,
    "\n  subscription MaintenanceRequestDeleted {\n    maintenanceRequestDeleted\n  }\n": typeof types.MaintenanceRequestDeletedDocument,
    "\n  subscription MaintenanceRequestRunScheduler {\n    maintenanceRequestRunScheduler\n  }\n": typeof types.MaintenanceRequestRunSchedulerDocument,
};
const documents: Documents = {
    "\n  fragment MaintenanceRequestFields on MaintenanceRequest {\n    _id\n    title\n    description\n    status\n    urgency\n    createdAt\n    updatedAt\n    resolvedAt\n    deletedAt\n  }\n": types.MaintenanceRequestFieldsFragmentDoc,
    "\n  fragment PagingFields on Paging {\n    page\n    perPage\n    prev\n    next\n    count\n  }\n": types.PagingFieldsFragmentDoc,
    "\n  query FindAllMaintenanceRequest($queryParam: QueryParamInput) {\n    findAllMaintenanceRequest(queryParam: $queryParam) {\n      items {\n        ...MaintenanceRequestFields\n      }\n      paging {\n        ...PagingFields\n      }\n    }\n  }\n  \n  \n": types.FindAllMaintenanceRequestDocument,
    "\n  query FindOneMaintenanceRequest($_id: ObjectId!) {\n    findOneMaintenanceRequest(_id: $_id) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": types.FindOneMaintenanceRequestDocument,
    "\n  query SummaryMaintenanceRequest {\n    summaryMaintenanceRequest {\n      averageDaysToResolve\n      open\n      urgent\n    }\n  }\n": types.SummaryMaintenanceRequestDocument,
    "\n  mutation CreateMaintenanceRequest($body: MaintenanceRequestInput!) {\n    createMaintenanceRequest(body: $body) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": types.CreateMaintenanceRequestDocument,
    "\n  mutation UpdateMaintenanceRequest(\n    $_id: ObjectId!\n    $body: MaintenanceRequestInput!\n  ) {\n    updateMaintenanceRequest(_id: $_id, body: $body) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": types.UpdateMaintenanceRequestDocument,
    "\n  mutation MarkAsResolvedMaintenanceRequest($_id: ObjectId!) {\n    markAsResolvedMaintenanceRequest(_id: $_id) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": types.MarkAsResolvedMaintenanceRequestDocument,
    "\n  mutation DeleteMaintenanceRequest($_id: ObjectId!) {\n    deleteMaintenanceRequest(_id: $_id)\n  }\n": types.DeleteMaintenanceRequestDocument,
    "\n  subscription MaintenanceRequestCreated {\n    maintenanceRequestCreated {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": types.MaintenanceRequestCreatedDocument,
    "\n  subscription MaintenanceRequestUpdated {\n    maintenanceRequestUpdated {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": types.MaintenanceRequestUpdatedDocument,
    "\n  subscription MaintenanceRequestResolved {\n    maintenanceRequestResolved {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n": types.MaintenanceRequestResolvedDocument,
    "\n  subscription MaintenanceRequestDeleted {\n    maintenanceRequestDeleted\n  }\n": types.MaintenanceRequestDeletedDocument,
    "\n  subscription MaintenanceRequestRunScheduler {\n    maintenanceRequestRunScheduler\n  }\n": types.MaintenanceRequestRunSchedulerDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MaintenanceRequestFields on MaintenanceRequest {\n    _id\n    title\n    description\n    status\n    urgency\n    createdAt\n    updatedAt\n    resolvedAt\n    deletedAt\n  }\n"): (typeof documents)["\n  fragment MaintenanceRequestFields on MaintenanceRequest {\n    _id\n    title\n    description\n    status\n    urgency\n    createdAt\n    updatedAt\n    resolvedAt\n    deletedAt\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PagingFields on Paging {\n    page\n    perPage\n    prev\n    next\n    count\n  }\n"): (typeof documents)["\n  fragment PagingFields on Paging {\n    page\n    perPage\n    prev\n    next\n    count\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindAllMaintenanceRequest($queryParam: QueryParamInput) {\n    findAllMaintenanceRequest(queryParam: $queryParam) {\n      items {\n        ...MaintenanceRequestFields\n      }\n      paging {\n        ...PagingFields\n      }\n    }\n  }\n  \n  \n"): (typeof documents)["\n  query FindAllMaintenanceRequest($queryParam: QueryParamInput) {\n    findAllMaintenanceRequest(queryParam: $queryParam) {\n      items {\n        ...MaintenanceRequestFields\n      }\n      paging {\n        ...PagingFields\n      }\n    }\n  }\n  \n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query FindOneMaintenanceRequest($_id: ObjectId!) {\n    findOneMaintenanceRequest(_id: $_id) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"): (typeof documents)["\n  query FindOneMaintenanceRequest($_id: ObjectId!) {\n    findOneMaintenanceRequest(_id: $_id) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SummaryMaintenanceRequest {\n    summaryMaintenanceRequest {\n      averageDaysToResolve\n      open\n      urgent\n    }\n  }\n"): (typeof documents)["\n  query SummaryMaintenanceRequest {\n    summaryMaintenanceRequest {\n      averageDaysToResolve\n      open\n      urgent\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateMaintenanceRequest($body: MaintenanceRequestInput!) {\n    createMaintenanceRequest(body: $body) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"): (typeof documents)["\n  mutation CreateMaintenanceRequest($body: MaintenanceRequestInput!) {\n    createMaintenanceRequest(body: $body) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateMaintenanceRequest(\n    $_id: ObjectId!\n    $body: MaintenanceRequestInput!\n  ) {\n    updateMaintenanceRequest(_id: $_id, body: $body) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"): (typeof documents)["\n  mutation UpdateMaintenanceRequest(\n    $_id: ObjectId!\n    $body: MaintenanceRequestInput!\n  ) {\n    updateMaintenanceRequest(_id: $_id, body: $body) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MarkAsResolvedMaintenanceRequest($_id: ObjectId!) {\n    markAsResolvedMaintenanceRequest(_id: $_id) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"): (typeof documents)["\n  mutation MarkAsResolvedMaintenanceRequest($_id: ObjectId!) {\n    markAsResolvedMaintenanceRequest(_id: $_id) {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteMaintenanceRequest($_id: ObjectId!) {\n    deleteMaintenanceRequest(_id: $_id)\n  }\n"): (typeof documents)["\n  mutation DeleteMaintenanceRequest($_id: ObjectId!) {\n    deleteMaintenanceRequest(_id: $_id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription MaintenanceRequestCreated {\n    maintenanceRequestCreated {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"): (typeof documents)["\n  subscription MaintenanceRequestCreated {\n    maintenanceRequestCreated {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription MaintenanceRequestUpdated {\n    maintenanceRequestUpdated {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"): (typeof documents)["\n  subscription MaintenanceRequestUpdated {\n    maintenanceRequestUpdated {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription MaintenanceRequestResolved {\n    maintenanceRequestResolved {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"): (typeof documents)["\n  subscription MaintenanceRequestResolved {\n    maintenanceRequestResolved {\n      ...MaintenanceRequestFields\n    }\n  }\n  \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription MaintenanceRequestDeleted {\n    maintenanceRequestDeleted\n  }\n"): (typeof documents)["\n  subscription MaintenanceRequestDeleted {\n    maintenanceRequestDeleted\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  subscription MaintenanceRequestRunScheduler {\n    maintenanceRequestRunScheduler\n  }\n"): (typeof documents)["\n  subscription MaintenanceRequestRunScheduler {\n    maintenanceRequestRunScheduler\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;