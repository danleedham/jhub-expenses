import { ModalComponent } from './../modal/modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExpenseDetailPage } from './expense-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ExpenseDetailPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ExpenseDetailPage, ModalComponent],
  entryComponents: [ModalComponent]
})
export class ExpenseDetailPageModule {}
