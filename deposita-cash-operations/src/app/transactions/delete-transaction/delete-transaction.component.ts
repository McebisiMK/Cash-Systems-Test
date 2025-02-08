import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { TransactionService } from '../../shared/services/transaction.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-transaction',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-transaction.component.html',
  styleUrl: './delete-transaction.component.css'
})
export class DeleteTransactionComponent {
  constructor(private transactionService: TransactionService,
    private transactionDialogRef: MatDialogRef<DeleteTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number }
  ) {
    this.transactionDialogRef.disableClose = true;
  }

  onConfirmClick(): void {
    this.transactionService.delete(this.data.id).subscribe({
      next: (response) => {
        this.transactionDialogRef.close(true);
      }
    })
  }
}
