import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { DialogConfirmationComponent } from './dialog-confirmation/dialog-confirmation.component';



@NgModule({
  declarations: [
    HeaderComponent,
    DialogConfirmationComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    MatDialogModule
  ], exports: [
    HeaderComponent
  ]
})
export class CoreModule { }
