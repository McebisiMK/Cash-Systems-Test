import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { AddTransactionComponent } from '../../transactions/add-transaction/add-transaction.component';

@Component({
  selector: 'main-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) { }

  addTransaction(): void {
    this.dialog.open(AddTransactionComponent, {
      width: '60%'
    });
  }
}
