import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  ObjectId: { input: any; output: any; }
};

export type MaintenanceRequest = {
  __typename?: 'MaintenanceRequest';
  _id: Scalars['ObjectId']['output'];
  createdAt: Scalars['Date']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  resolvedAt?: Maybe<Scalars['Date']['output']>;
  status: MaintenanceRequestStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
  urgency: MaintenanceRequestUrgency;
};

export type MaintenanceRequestInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  status: MaintenanceRequestStatus;
  title: Scalars['String']['input'];
  urgency: MaintenanceRequestUrgency;
};

export enum MaintenanceRequestStatus {
  Open = 'OPEN',
  Resolved = 'RESOLVED'
}

export type MaintenanceRequestSummary = {
  __typename?: 'MaintenanceRequestSummary';
  averageDaysToResolve?: Maybe<Scalars['Int']['output']>;
  open?: Maybe<Scalars['Int']['output']>;
  urgent?: Maybe<Scalars['Int']['output']>;
};

export enum MaintenanceRequestUrgency {
  Emergency = 'EMERGENCY',
  LessUrgent = 'LESS_URGENT',
  NoneUrgent = 'NONE_URGENT',
  Urgent = 'URGENT'
}

export type Mutation = {
  __typename?: 'Mutation';
  createMaintenanceRequest?: Maybe<MaintenanceRequest>;
  deleteMaintenanceRequest?: Maybe<Scalars['Boolean']['output']>;
  markAsResolvedMaintenanceRequest?: Maybe<MaintenanceRequest>;
  updateMaintenanceRequest?: Maybe<MaintenanceRequest>;
};


export type MutationCreateMaintenanceRequestArgs = {
  body: MaintenanceRequestInput;
};


export type MutationDeleteMaintenanceRequestArgs = {
  _id: Scalars['ObjectId']['input'];
};


export type MutationMarkAsResolvedMaintenanceRequestArgs = {
  _id: Scalars['ObjectId']['input'];
};


export type MutationUpdateMaintenanceRequestArgs = {
  _id: Scalars['ObjectId']['input'];
  body: MaintenanceRequestInput;
};

export type PaginatedMaintenanceRequests = {
  __typename?: 'PaginatedMaintenanceRequests';
  items: Array<MaintenanceRequest>;
  paging: Paging;
};

export type Paging = {
  __typename?: 'Paging';
  count: Scalars['Int']['output'];
  next: Scalars['Boolean']['output'];
  page: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  prev: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAllMaintenanceRequest: PaginatedMaintenanceRequests;
  findOneMaintenanceRequest?: Maybe<MaintenanceRequest>;
  summaryMaintenanceRequest: MaintenanceRequestSummary;
};


export type QueryFindAllMaintenanceRequestArgs = {
  queryParam?: InputMaybe<QueryParamInput>;
};


export type QueryFindOneMaintenanceRequestArgs = {
  _id: Scalars['ObjectId']['input'];
};

export type QueryParamInput = {
  keyword: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  perPage: Scalars['Int']['input'];
  sort: Sort;
};

export enum Sort {
  Latest = 'LATEST',
  Oldest = 'OLDEST'
}

export type Subscription = {
  __typename?: 'Subscription';
  maintenanceRequestCreated: MaintenanceRequest;
  maintenanceRequestDeleted: Scalars['Boolean']['output'];
  maintenanceRequestResolved: MaintenanceRequest;
  maintenanceRequestRunScheduler: Scalars['Boolean']['output'];
  maintenanceRequestUpdated: MaintenanceRequest;
};

export type AdditionalEntityFields = {
  path?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  MaintenanceRequest: ResolverTypeWrapper<MaintenanceRequest>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  MaintenanceRequestInput: MaintenanceRequestInput;
  MaintenanceRequestStatus: MaintenanceRequestStatus;
  MaintenanceRequestSummary: ResolverTypeWrapper<MaintenanceRequestSummary>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  MaintenanceRequestUrgency: MaintenanceRequestUrgency;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']['output']>;
  PaginatedMaintenanceRequests: ResolverTypeWrapper<PaginatedMaintenanceRequests>;
  Paging: ResolverTypeWrapper<Paging>;
  Query: ResolverTypeWrapper<{}>;
  QueryParamInput: QueryParamInput;
  Sort: Sort;
  Subscription: ResolverTypeWrapper<{}>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date']['output'];
  MaintenanceRequest: MaintenanceRequest;
  String: Scalars['String']['output'];
  MaintenanceRequestInput: MaintenanceRequestInput;
  MaintenanceRequestSummary: MaintenanceRequestSummary;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Boolean: Scalars['Boolean']['output'];
  ObjectId: Scalars['ObjectId']['output'];
  PaginatedMaintenanceRequests: PaginatedMaintenanceRequests;
  Paging: Paging;
  Query: {};
  QueryParamInput: QueryParamInput;
  Subscription: {};
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {
  discriminatorField?: Maybe<Scalars['String']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {
  discriminatorField: Scalars['String']['input'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {
  embedded?: Maybe<Scalars['Boolean']['input']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>;
};

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = { };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {
  overrideType?: Maybe<Scalars['String']['input']>;
};

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = { };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {
  path: Scalars['String']['input'];
};

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type MaintenanceRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['MaintenanceRequest'] = ResolversParentTypes['MaintenanceRequest']> = {
  _id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  resolvedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['MaintenanceRequestStatus'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  urgency?: Resolver<ResolversTypes['MaintenanceRequestUrgency'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MaintenanceRequestSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['MaintenanceRequestSummary'] = ResolversParentTypes['MaintenanceRequestSummary']> = {
  averageDaysToResolve?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  open?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  urgent?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createMaintenanceRequest?: Resolver<Maybe<ResolversTypes['MaintenanceRequest']>, ParentType, ContextType, RequireFields<MutationCreateMaintenanceRequestArgs, 'body'>>;
  deleteMaintenanceRequest?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteMaintenanceRequestArgs, '_id'>>;
  markAsResolvedMaintenanceRequest?: Resolver<Maybe<ResolversTypes['MaintenanceRequest']>, ParentType, ContextType, RequireFields<MutationMarkAsResolvedMaintenanceRequestArgs, '_id'>>;
  updateMaintenanceRequest?: Resolver<Maybe<ResolversTypes['MaintenanceRequest']>, ParentType, ContextType, RequireFields<MutationUpdateMaintenanceRequestArgs, '_id' | 'body'>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type PaginatedMaintenanceRequestsResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaginatedMaintenanceRequests'] = ResolversParentTypes['PaginatedMaintenanceRequests']> = {
  items?: Resolver<Array<ResolversTypes['MaintenanceRequest']>, ParentType, ContextType>;
  paging?: Resolver<ResolversTypes['Paging'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PagingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Paging'] = ResolversParentTypes['Paging']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  next?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  prev?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  findAllMaintenanceRequest?: Resolver<ResolversTypes['PaginatedMaintenanceRequests'], ParentType, ContextType, Partial<QueryFindAllMaintenanceRequestArgs>>;
  findOneMaintenanceRequest?: Resolver<Maybe<ResolversTypes['MaintenanceRequest']>, ParentType, ContextType, RequireFields<QueryFindOneMaintenanceRequestArgs, '_id'>>;
  summaryMaintenanceRequest?: Resolver<ResolversTypes['MaintenanceRequestSummary'], ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  maintenanceRequestCreated?: SubscriptionResolver<ResolversTypes['MaintenanceRequest'], "maintenanceRequestCreated", ParentType, ContextType>;
  maintenanceRequestDeleted?: SubscriptionResolver<ResolversTypes['Boolean'], "maintenanceRequestDeleted", ParentType, ContextType>;
  maintenanceRequestResolved?: SubscriptionResolver<ResolversTypes['MaintenanceRequest'], "maintenanceRequestResolved", ParentType, ContextType>;
  maintenanceRequestRunScheduler?: SubscriptionResolver<ResolversTypes['Boolean'], "maintenanceRequestRunScheduler", ParentType, ContextType>;
  maintenanceRequestUpdated?: SubscriptionResolver<ResolversTypes['MaintenanceRequest'], "maintenanceRequestUpdated", ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  MaintenanceRequest?: MaintenanceRequestResolvers<ContextType>;
  MaintenanceRequestSummary?: MaintenanceRequestSummaryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  PaginatedMaintenanceRequests?: PaginatedMaintenanceRequestsResolvers<ContextType>;
  Paging?: PagingResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};

import { ObjectId } from 'mongodb';