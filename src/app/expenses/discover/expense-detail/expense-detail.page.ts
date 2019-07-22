import { Subscription } from 'rxjs';
import { ModalComponent } from "./../modal/modal.component";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import {
  NavController,
  ModalController,
  ActionSheetController
} from "@ionic/angular";
import { ExpensesService } from "../../expenses.service";
import { Expense } from "../../expense.model";

@Component({
  selector: "app-expense-detail",
  templateUrl: "./expense-detail.page.html",
  styleUrls: ["./expense-detail.page.scss"]
})
export class ExpenseDetailPage implements OnInit, OnDestroy {
  expense: Expense;
  private expenseSub: Subscription;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private expensesService: ExpensesService,
    private modalCrtl: ModalController,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("expenseId")) {
        this.navCtrl.navigateBack("/expenses/tabs/discover");
        return;
      }
      this.expensesService.getExpense(paramMap.get("expenseId")).subscribe(expense => {
        this.expense = expense;
      });
    });
  }

  onShowRules() {
    // this.navCtrl.navigateBack("/expenses/tabs/discover");
    // this.navCtrl.pop();  //  pop off the top page. Looks sick, doesn't work if not in stack.

    this.actionSheetCtrl.create({
      header: "Choose an Action",
      buttons: [
        {
          text: "Regular Full Time",
          handler: () => {
            this.openModal('select');
          }
        },
        {
          text: "FTRS or Other",
          handler: () => {
            this.openModal('random');
          }
        },
        {
          text: "Cancel",
          role: 'cancel'
        }
      ]
    }).then(actionSheetEl => {
      actionSheetEl.present();
    });
  }

  openModal(mode: 'select' | 'random'){
    console.log(mode);
    this.modalCrtl
      .create({
        component: ModalComponent,
        componentProps: { selectedExpense: this.expense }
      })
      .then(modalEl => {
        modalEl.present();
        return modalEl.onDidDismiss();
      })
      .then(resultData => {
        // console.log(resultData.data, resultData.role);
        if (resultData.role === "cancel") {
          // console.log('User Closed Modal');
        }
      });
  }

  ngOnDestroy(){
    if (this.expenseSub){
      this.expenseSub.unsubscribe();
    }
  }
}
