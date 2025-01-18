import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TransactionService } from '../../shared/services/transaction.service';
import { Transaction, TransactionType } from '../../shared/models';

@Component({
  selector: 'app-add-transaction',
  providers: [provideNativeDateAdapter(), TransactionService],
  imports: [
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './add-transaction.component.html',
  styleUrl: './add-transaction.component.css'
})
export class AddTransactionComponent implements OnInit {
  transactionFormGroup?: UntypedFormGroup;
  transactionTypeControl = new FormControl<TransactionType | null>(null, Validators.required);
  transactionTypes: TransactionType[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private transactionService: TransactionService,
    private transactionDialogRef: MatDialogRef<AddTransactionComponent>
  ) {
    this.transactionDialogRef.disableClose = true;
    this.createTransactionForm();
  }

  ngOnInit(): void {
    this.transactionService.getTransactionTypes().subscribe({
      next: (transactionTypes) => {
        this.transactionTypes = transactionTypes;
      }
    })
  }

  back(): void {
    this.transactionDialogRef.close();
  }

  submit(): void {
    if (this.transactionFormGroup?.valid && this.transactionFormGroup.dirty) {
      const transaction = {
        amount: this.transactionFormGroup.getRawValue().amount,
        description: this.transactionFormGroup.getRawValue().description,
        transactionType: this.transactionTypeControl?.getRawValue()!.name,
        dateCreated: this.transactionFormGroup.getRawValue().dateCreated
      } as Transaction;

      this.transactionService.save(transaction).subscribe({
        next: (response) => {
          this.transactionFormGroup?.reset();
          this.transactionDialogRef.close();
          window.location.reload();
        }
      });
    }
  }

  private createTransactionForm(): void {
    this.transactionFormGroup = this.formBuilder.group({
      amount: new UntypedFormControl("", [Validators.required]),
      description: new UntypedFormControl("", [Validators.required]),
      dateCreated: new UntypedFormControl(new Date, [Validators.required])
    })
  }
}
