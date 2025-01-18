import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Transaction, TransactionType } from "../models";

@Injectable()
export class TransactionService {
  private readonly baseUrl: string = environment.applicationUrl;

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Array<Transaction>> {
    return this.httpClient.get<Array<Transaction>>(`${this.baseUrl}/transactions`)
  }

  getTransactionTypes(): Observable<Array<TransactionType>> {
    return this.httpClient.get<Array<TransactionType>>(`${this.baseUrl}/transactions/types`)
  }

  save(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.post<Transaction>(`${this.baseUrl}/transactions/add`, transaction)
  }

  update(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.put<Transaction>(`${this.baseUrl}/transactions/update`, transaction)
  }

  delete(transactionId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/transactions/${transactionId}`)
  }
}
