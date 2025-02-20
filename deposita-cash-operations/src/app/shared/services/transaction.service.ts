import { Injectable, Signal, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TransactionService {
  private transactionAdded = signal<boolean>(false);

  get transactionAddedSignal(): Signal<boolean> {
    return this.transactionAdded;
  }

  notifyTransactionAdded(): void {
    this.transactionAdded.set(true);
  }

  resetSignal(): void {
    this.transactionAdded.set(false);
  }
}
