import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular"
import {
  Query,
  QueryTransactionsArgs,
  QueryTransactionTypesArgs,
} from "../codegen/graphql";

/*----------------------------------------------------------------------------------------------------------------------*/

type Queries<T extends keyof Query> = Pick<Query, T>;

@Injectable({ providedIn: 'root' })
export class TransactionTypesQuery extends Apollo.Query<Queries<'transactionTypes'>, QueryTransactionTypesArgs> {
  document: any = gql`
    query GetTransactionTypes($order: [TransactionTypeDTOSortInput!]) {
      transactionTypes(order: $order) {
        id
        name
      }
    }
  `
}

const TRANSACTION_FRAGMENT = gql`
  fragment TransactionTable_Transaction on TransactionDTO {
    id
    amount
    description
    transactionType
    dateCreated
  }
`

@Injectable({ providedIn: 'root' })
export class TransactionsQuery extends Apollo.Query<Queries<'transactions'>, QueryTransactionsArgs> {
  document = gql`
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
    ${TRANSACTION_FRAGMENT}
  `
}
