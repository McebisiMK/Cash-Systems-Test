import gql from "graphql-tag";
import { Injectable } from "@angular/core";
import * as Apollo from "apollo-angular"
import { Mutation, MutationAddTransactionArgs } from "../codegen/graphql";

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

@Injectable()
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
