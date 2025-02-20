import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular"
import { Mutation, MutationAddTransactionArgs, MutationDeleteTransactionArgs, MutationUpdateTransactionArgs } from "../codegen/graphql";

/*----------------------------------------------------------------------------------------------------------------------*/

type Mutations<T extends keyof Mutation> = Pick<Mutation, T>;

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
export class AddTransactionMutation extends Apollo.Mutation<Mutations<'addTransaction'>, MutationAddTransactionArgs> {
  document: any = gql`
    mutation AddTransaction($command: AddTransactionCommandInput!) {
      addTransaction(command: $command) {
        ...TransactionTable_Transaction
      }
    }
    ${TRANSACTION_FRAGMENT}
  `;
}

@Injectable({ providedIn: 'root' })
export class UpdateTransactionMutation extends Apollo.Mutation<Mutations<'updateTransaction'>, MutationUpdateTransactionArgs> {
  document: any = gql`
    mutation UpdateTransaction($command: UpdateTransactionCommandInput!) {
      updateTransaction(command: $command) {
        ...TransactionTable_Transaction
      }
    }
    ${TRANSACTION_FRAGMENT}
  `;
}

@Injectable({ providedIn: 'root' })
export class DeleteTransactionMutation extends Apollo.Mutation<Mutations<'deleteTransaction'>, MutationDeleteTransactionArgs> {
  document: any = gql`
    mutation DeleteTransaction($command: DeleteTransactionCommandInput!) {
      deleteTransaction(command: $command)
    }
  `;
}
