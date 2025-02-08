import { Component } from '@angular/core';
import { MainComponent } from "./main/main.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { TransactionService } from './shared/services/transaction.service';

@Component({
  selector: 'app-root',
  imports: [MainComponent, TransactionsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'deposita-cash-operations';
}
