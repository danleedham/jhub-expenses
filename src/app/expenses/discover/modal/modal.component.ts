import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { Expense } from '../../expense.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() selectedExpense: Expense;
  @Input() selectedMode: 'regular' | 'ftrs';
  
  jspAllowanceDetails: number;
  expenseRemaining: number;
  expenseRemainingDetails: string;
  
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    if(this.selectedMode === 'regular'){
      this.jspAllowanceDetails = 25;
    } else {
      this.jspAllowanceDetails = 5;
    } 

    this.expenseRemaining = this.jspAllowanceDetails - this.selectedExpense.price;

    if(this.expenseRemaining > 0){
      this.expenseRemainingDetails = 'you still have £' + this.expenseRemaining.toString() + ' before you hit the daily limit';
    } else {
      this.expenseRemainingDetails = 'you are over the daily limit by £' + (this.expenseRemaining * -1).toString();
    }
    // console.log(this.selectedMode);

  }

  onModalClose() {
    this.modalCtrl.dismiss(null,'cancel');
  }

}
