import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Transaction, TransactionType } from '../../shared/models';
import { TransactionService } from '../../shared/services/transaction.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { GetTransactionTypesGQL, UpdateTransactionGQL } from '../../shared/graphQL/codegen/graphql';

@Component({
  selector: 'app-update-transaction',
  providers: [provideNativeDateAdapter()],
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
  templateUrl: './update-transaction.component.html',
  styleUrl: './update-transaction.component.css'
})
export class UpdateTransactionComponent implements OnInit {
  transactionFormGroup?: UntypedFormGroup;
  transactionTypeControl = new FormControl<TransactionType | null>(null, Validators.required);
  transactionTypes: TransactionType[] = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private transactionService: TransactionService,
    private updateTransactionGQL: UpdateTransactionGQL,
    private transactionTypesGQL: GetTransactionTypesGQL,
    private transactionDialogRef: MatDialogRef<UpdateTransactionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { transaction: Transaction }
  ) {
    this.transactionDialogRef.disableClose = true;
    this.createTransactionForm();
  }

  ngOnInit(): void {
    this.transactionTypesGQL.watch().valueChanges.subscribe({
      next: (response) => {
        this.transactionTypes = response.data.transactionTypes || [];
        this.transactionTypeControl.patchValue(this.transactionTypes.find(x => x.name === this.data.transaction.transactionType) || null)
      }
    })
  }

  back(): void {
    this.transactionDialogRef.close();
  }

  update(): void {
    if (this.transactionFormGroup?.valid && this.transactionFormGroup.dirty) {
      const transaction = {
        id: this.data.transaction.id,
        amount: this.transactionFormGroup.getRawValue().amount,
        description: this.transactionFormGroup.getRawValue().description,
        transactionType: this.transactionTypeControl?.getRawValue()!.name
      };

      this.updateTransactionGQL.mutate({ command: transaction }).subscribe({
        next: (_) => {
          this.transactionFormGroup?.reset();
          this.transactionDialogRef.close();
          this.transactionService.notifyTransactionAdded();
        }
      });
    }
  }

  private createTransactionForm(): void {
    this.transactionFormGroup = this.formBuilder.group({
      amount: new UntypedFormControl(this.data.transaction?.amount, [Validators.required]),
      description: new UntypedFormControl(this.data.transaction?.description, [Validators.required]),
      dateCreated: new UntypedFormControl(this.data.transaction?.dateCreated, [Validators.required])
    })
  }
}
