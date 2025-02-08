import { Component, effect, OnInit, ViewChild } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { UpdateTransactionComponent } from './update-transaction/update-transaction.component';
import { MatInputModule } from '@angular/material/input';
import { DeleteTransactionComponent } from './delete-transaction/delete-transaction.component';
import { GetTransactionsGQL, SortEnumType } from '../shared/graphQL/codegen/graphql';
import { debounceTime } from 'rxjs/operators';
import { TransactionService } from '../shared/services/transaction.service';

@Component({
  selector: 'app-transactions',
  providers: [GetTransactionsGQL],
  imports: [
    FormsModule,
    MatFormFieldModule,
    CommonModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  transactionColumns: Array<string
  > = ['amount', 'description', 'transactionType', 'createdDate', 'actions'];
  pageSize = 5;
  totalCount = 0;
  currentPage = 0;
  dataSource = new MatTableDataSource<Transaction>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort, {}) sort!: MatSort;

  constructor(private dialog: MatDialog, private transactionsGQL: GetTransactionsGQL, private transactionService: TransactionService) {
    effect(() => {
      if (this.transactionService.transactionAddedSignal()) {
        this.loadTransactions();
        this.transactionService.resetSignal();
      }
    })
  }

  ngOnInit(): void {
    this.loadTransactions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.paginator.page.pipe(debounceTime(300)).subscribe({
      next: () => {
        this.pageSize = this.paginator.pageSize;
        this.currentPage = this.paginator.pageIndex;
        this.loadTransactions();
      }
    })
  }

  update(transaction: Transaction): void {
    this.dialog.open(UpdateTransactionComponent, {
      width: '60%',
      data: { transaction }
    }).afterClosed().subscribe(() => {
      this.loadTransactions();
    });
  }

  delete(id: number): void {
    this.dialog.open(DeleteTransactionComponent, {
      width: '60%',
      data: { id }
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) this.loadTransactions();
    })
  }

  private loadTransactions(): void {
    const take = this.pageSize;
    const skip = this.currentPage * this.pageSize;

    this.transactionsGQL.watch({ skip: skip, take: take, order: { amount: SortEnumType.Desc } }).valueChanges.subscribe({
      next: (response) => {
        this.dataSource = new MatTableDataSource(response.data.transactions?.items || []);
        this.totalCount = response.data.transactions?.totalCount || 0;
      }
    })
  }
}
