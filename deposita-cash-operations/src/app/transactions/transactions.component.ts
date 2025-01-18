import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Transaction } from '../shared/models';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionService } from '../shared/services/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTransactionComponent } from './update-transaction/update-transaction.component';
import { MatInputModule } from '@angular/material/input';
import { DeleteTransactionComponent } from './delete-transaction/delete-transaction.component';

@Component({
  selector: 'app-transactions',
  providers: [TransactionService],
  imports: [FormsModule, MatFormFieldModule, CommonModule, MatPaginatorModule, MatProgressSpinnerModule, MatTableModule, MatIconModule, MatInputModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  transactionColumns: Array<string
  > = ['amount', 'description', 'transactionType', 'createdDate', 'actions'];
  dataSource = new MatTableDataSource<Transaction>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort;

  constructor(private dialog: MatDialog, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.getTransactions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  update(transaction: Transaction): void {
    this.dialog.open(UpdateTransactionComponent, {
      width: '60%',
      data: { transaction }
    }).afterClosed().subscribe(() => {
      this.getTransactions();
    });
  }

  delete(id: number): void {
    this.dialog.open(DeleteTransactionComponent, {
      width: '60%',
      data: { id }
    }).afterClosed().subscribe((confirmed: boolean) => {
      this.getTransactions();
    })
  }

  private getTransactions(): void {
    this.transactionService.getAll().subscribe({
      next: (transactions) => {
        this.dataSource = new MatTableDataSource(transactions);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    });
  }
}
