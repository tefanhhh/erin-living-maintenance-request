/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** MongoDB ObjectId custom scalar */
  ObjectId: { input: any; output: any; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
};

export enum MaintenanceRequestStatus {
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

export enum MaintenanceRequestUrgency {
  Urgent = 'URGENT',
  NoneUrgent = 'NONE_URGENT',
  LessUrgent = 'LESS_URGENT',
  Emergency = 'EMERGENCY'
}

export type MaintenanceRequestInput = {
  title?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<MaintenanceRequestStatus>;
  urgency?: InputMaybe<MaintenanceRequestUrgency>;
};

export type MaintenanceRequest = {
  __typename?: 'MaintenanceRequest';
  _id?: Maybe<Scalars['ObjectId']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  status?: Maybe<MaintenanceRequestStatus>;
  urgency?: Maybe<MaintenanceRequestUrgency>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  deletedAt?: Maybe<Scalars['Date']['output']>;
};

export type Query = {
  __typename?: 'Query';
  findOneMaintenanceRequest?: Maybe<MaintenanceRequest>;
  findAllMaintenanceRequests?: Maybe<Array<Maybe<MaintenanceRequest>>>;
};


export type QueryFindOneMaintenanceRequestArgs = {
  _id: Scalars['ObjectId']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMaintenanceRequest?: Maybe<MaintenanceRequest>;
  updateMaintenanceRequest?: Maybe<MaintenanceRequest>;
  deleteMaintenanceRequest?: Maybe<Scalars['Boolean']['output']>;
};


export type MutationCreateMaintenanceRequestArgs = {
  body: MaintenanceRequestInput;
};


export type MutationUpdateMaintenanceRequestArgs = {
  _id: Scalars['ObjectId']['input'];
  title: Scalars['String']['input'];
  body: MaintenanceRequestInput;
};


export type MutationDeleteMaintenanceRequestArgs = {
  _id: Scalars['ObjectId']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  maintenanceRequestCreated?: Maybe<MaintenanceRequest>;
  maintenanceRequestUpdated?: Maybe<MaintenanceRequest>;
  maintenanceRequestDeleted?: Maybe<MaintenanceRequest>;
};

export type FindAllMaintenanceRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllMaintenanceRequestsQuery = { __typename?: 'Query', findAllMaintenanceRequests?: Array<{ __typename?: 'MaintenanceRequest', _id?: any | null, title?: string | null, description?: string | null, status?: MaintenanceRequestStatus | null, urgency?: MaintenanceRequestUrgency | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null } | null> | null };

export type FindOneMaintenanceRequestQueryVariables = Exact<{
  _id: Scalars['ObjectId']['input'];
}>;


export type FindOneMaintenanceRequestQuery = { __typename?: 'Query', findOneMaintenanceRequest?: { __typename?: 'MaintenanceRequest', _id?: any | null, title?: string | null, description?: string | null, status?: MaintenanceRequestStatus | null, urgency?: MaintenanceRequestUrgency | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null } | null };


export const FindAllMaintenanceRequestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindAllMaintenanceRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findAllMaintenanceRequests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"urgency"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<FindAllMaintenanceRequestsQuery, FindAllMaintenanceRequestsQueryVariables>;
export const FindOneMaintenanceRequestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FindOneMaintenanceRequest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectId"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"findOneMaintenanceRequest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"urgency"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<FindOneMaintenanceRequestQuery, FindOneMaintenanceRequestQueryVariables>;