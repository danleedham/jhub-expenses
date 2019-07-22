import { ExpensesRoutingModule } from './places-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExpensesPage } from './expenses.page';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    ExpensesRoutingModule
  ],
  declarations: [ExpensesPage]
})
export class ExpensesPageModule {}
