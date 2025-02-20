import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
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
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: any; output: any; }
  /** The `Decimal` scalar type represents a decimal floating-point number. */
  Decimal: { input: any; output: any; }
};

export type AddTransactionCommandInput = {
  amount: Scalars['Decimal']['input'];
  dateCreated: Scalars['DateTime']['input'];
  description: Scalars['String']['input'];
  transactionType: Scalars['String']['input'];
};

/** Information about the offset pagination. */
export type CollectionSegmentInfo = {
  __typename?: 'CollectionSegmentInfo';
  /** Indicates whether more items exist following the set defined by the clients arguments. */
  hasNextPage: Scalars['Boolean']['output'];
  /** Indicates whether more items exist prior the set defined by the clients arguments. */
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type DateTimeOperationFilterInput = {
  eq?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
  neq?: InputMaybe<Scalars['DateTime']['input']>;
  ngt?: InputMaybe<Scalars['DateTime']['input']>;
  ngte?: InputMaybe<Scalars['DateTime']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  nlt?: InputMaybe<Scalars['DateTime']['input']>;
  nlte?: InputMaybe<Scalars['DateTime']['input']>;
};

export type DecimalOperationFilterInput = {
  eq?: InputMaybe<Scalars['Decimal']['input']>;
  gt?: InputMaybe<Scalars['Decimal']['input']>;
  gte?: InputMaybe<Scalars['Decimal']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  lt?: InputMaybe<Scalars['Decimal']['input']>;
  lte?: InputMaybe<Scalars['Decimal']['input']>;
  neq?: InputMaybe<Scalars['Decimal']['input']>;
  ngt?: InputMaybe<Scalars['Decimal']['input']>;
  ngte?: InputMaybe<Scalars['Decimal']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Decimal']['input']>>>;
  nlt?: InputMaybe<Scalars['Decimal']['input']>;
  nlte?: InputMaybe<Scalars['Decimal']['input']>;
};

export type DeleteTransactionCommandInput = {
  id: Scalars['Int']['input'];
};

export type IntOperationFilterInput = {
  eq?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
  neq?: InputMaybe<Scalars['Int']['input']>;
  ngt?: InputMaybe<Scalars['Int']['input']>;
  ngte?: InputMaybe<Scalars['Int']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  nlt?: InputMaybe<Scalars['Int']['input']>;
  nlte?: InputMaybe<Scalars['Int']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addTransaction?: Maybe<TransactionDto>;
  deleteTransaction: Scalars['Boolean']['output'];
  updateTransaction?: Maybe<TransactionDto>;
};


export type MutationAddTransactionArgs = {
  command: AddTransactionCommandInput;
};


export type MutationDeleteTransactionArgs = {
  command: DeleteTransactionCommandInput;
};


export type MutationUpdateTransactionArgs = {
  command: UpdateTransactionCommandInput;
};

export type Query = {
  __typename?: 'Query';
  transactionTypes: Array<TransactionTypeDto>;
  transactions?: Maybe<TransactionsCollectionSegment>;
};


export type QueryTransactionTypesArgs = {
  order?: InputMaybe<Array<TransactionTypeDtoSortInput>>;
  where?: InputMaybe<TransactionTypeDtoFilterInput>;
};


export type QueryTransactionsArgs = {
  order?: InputMaybe<Array<TransactionDtoSortInput>>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TransactionDtoFilterInput>;
};

export enum SortEnumType {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringOperationFilterInput = {
  and?: InputMaybe<Array<StringOperationFilterInput>>;
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ncontains?: InputMaybe<Scalars['String']['input']>;
  nendsWith?: InputMaybe<Scalars['String']['input']>;
  neq?: InputMaybe<Scalars['String']['input']>;
  nin?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  nstartsWith?: InputMaybe<Scalars['String']['input']>;
  or?: InputMaybe<Array<StringOperationFilterInput>>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TransactionDto = {
  __typename?: 'TransactionDTO';
  amount: Scalars['Decimal']['output'];
  dateCreated: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  transactionType: Scalars['String']['output'];
};

export type TransactionDtoFilterInput = {
  amount?: InputMaybe<DecimalOperationFilterInput>;
  and?: InputMaybe<Array<TransactionDtoFilterInput>>;
  dateCreated?: InputMaybe<DateTimeOperationFilterInput>;
  description?: InputMaybe<StringOperationFilterInput>;
  id?: InputMaybe<IntOperationFilterInput>;
  or?: InputMaybe<Array<TransactionDtoFilterInput>>;
  transactionType?: InputMaybe<StringOperationFilterInput>;
};

export type TransactionDtoSortInput = {
  amount?: InputMaybe<SortEnumType>;
  dateCreated?: InputMaybe<SortEnumType>;
  description?: InputMaybe<SortEnumType>;
  id?: InputMaybe<SortEnumType>;
  transactionType?: InputMaybe<SortEnumType>;
};

export type TransactionTypeDto = {
  __typename?: 'TransactionTypeDTO';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type TransactionTypeDtoFilterInput = {
  and?: InputMaybe<Array<TransactionTypeDtoFilterInput>>;
  id?: InputMaybe<IntOperationFilterInput>;
  name?: InputMaybe<StringOperationFilterInput>;
  or?: InputMaybe<Array<TransactionTypeDtoFilterInput>>;
};

export type TransactionTypeDtoSortInput = {
  id?: InputMaybe<SortEnumType>;
  name?: InputMaybe<SortEnumType>;
};

/** A segment of a collection. */
export type TransactionsCollectionSegment = {
  __typename?: 'TransactionsCollectionSegment';
  /** A flattened list of the items. */
  items?: Maybe<Array<TransactionDto>>;
  /** Information to aid in pagination. */
  pageInfo: CollectionSegmentInfo;
  totalCount: Scalars['Int']['output'];
};

export type UpdateTransactionCommandInput = {
  amount: Scalars['Decimal']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  transactionType: Scalars['String']['input'];
};

export type TransactionTable_TransactionFragment = { __typename?: 'TransactionDTO', id: number, amount: any, description: string, transactionType: string, dateCreated: any };

export type AddTransactionMutationVariables = Exact<{
  command: AddTransactionCommandInput;
}>;


export type AddTransactionMutation = { __typename?: 'Mutation', addTransaction?: { __typename?: 'TransactionDTO', id: number, amount: any, description: string, transactionType: string, dateCreated: any } | null };

export type UpdateTransactionMutationVariables = Exact<{
  command: UpdateTransactionCommandInput;
}>;


export type UpdateTransactionMutation = { __typename?: 'Mutation', updateTransaction?: { __typename?: 'TransactionDTO', id: number, amount: any, description: string, transactionType: string, dateCreated: any } | null };

export type DeleteTransactionMutationVariables = Exact<{
  command: DeleteTransactionCommandInput;
}>;


export type DeleteTransactionMutation = { __typename?: 'Mutation', deleteTransaction: boolean };

export type GetTransactionTypesQueryVariables = Exact<{
  order?: InputMaybe<Array<TransactionTypeDtoSortInput> | TransactionTypeDtoSortInput>;
}>;


export type GetTransactionTypesQuery = { __typename?: 'Query', transactionTypes: Array<{ __typename?: 'TransactionTypeDTO', id: number, name: string }> };

export type GetTransactionsQueryVariables = Exact<{
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<Array<TransactionDtoSortInput> | TransactionDtoSortInput>;
  where?: InputMaybe<TransactionDtoFilterInput>;
}>;


export type GetTransactionsQuery = { __typename?: 'Query', transactions?: { __typename?: 'TransactionsCollectionSegment', totalCount: number, pageInfo: { __typename?: 'CollectionSegmentInfo', hasNextPage: boolean, hasPreviousPage: boolean }, items?: Array<{ __typename?: 'TransactionDTO', id: number, amount: any, description: string, transactionType: string, dateCreated: any }> | null } | null };

export const TransactionTable_TransactionFragmentDoc = gql`
    fragment TransactionTable_Transaction on TransactionDTO {
  id
  amount
  description
  transactionType
  dateCreated
}
    `;
export const AddTransactionDocument = gql`
    mutation AddTransaction($command: AddTransactionCommandInput!) {
  addTransaction(command: $command) {
    ...TransactionTable_Transaction
  }
}
    ${TransactionTable_TransactionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class AddTransactionGQL extends Apollo.Mutation<AddTransactionMutation, AddTransactionMutationVariables> {
    document = AddTransactionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const UpdateTransactionDocument = gql`
    mutation UpdateTransaction($command: UpdateTransactionCommandInput!) {
  updateTransaction(command: $command) {
    ...TransactionTable_Transaction
  }
}
    ${TransactionTable_TransactionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class UpdateTransactionGQL extends Apollo.Mutation<UpdateTransactionMutation, UpdateTransactionMutationVariables> {
    document = UpdateTransactionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const DeleteTransactionDocument = gql`
    mutation DeleteTransaction($command: DeleteTransactionCommandInput!) {
  deleteTransaction(command: $command)
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class DeleteTransactionGQL extends Apollo.Mutation<DeleteTransactionMutation, DeleteTransactionMutationVariables> {
    document = DeleteTransactionDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetTransactionTypesDocument = gql`
    query GetTransactionTypes($order: [TransactionTypeDTOSortInput!]) {
  transactionTypes(order: $order) {
    id
    name
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTransactionTypesGQL extends Apollo.Query<GetTransactionTypesQuery, GetTransactionTypesQueryVariables> {
    document = GetTransactionTypesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetTransactionsDocument = gql`
    query GetTransactions($skip: Int, $take: Int, $order: [TransactionDTOSortInput!], $where: TransactionDTOFilterInput) {
  transactions(skip: $skip, take: $take, order: $order, where: $where) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    items {
      ...TransactionTable_Transaction
    }
  }
}
    ${TransactionTable_TransactionFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetTransactionsGQL extends Apollo.Query<GetTransactionsQuery, GetTransactionsQueryVariables> {
    document = GetTransactionsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }