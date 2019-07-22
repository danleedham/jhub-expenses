import { Subscription } from 'rxjs';
import { ExpensesService } from "./../../expenses.service";
import { NavController } from "@ionic/angular";
import { Expense } from "./../../expense.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-view-expense",
  templateUrl: "./view-expense.page.html",
  styleUrls: ["./view-expense.page.scss"]
})
export class ViewExpensePage implements OnInit, OnDestroy {
  expense: Expense;
  private expenseSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private expensesService: ExpensesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("expenseId")) {
        this.navCtrl.navigateBack("/expenses/tabs/manage");
        return;
      }
      this.expenseSub = this.expensesService.getExpense(paramMap.get('expenseId')).subscribe(expense => {
        this.expense = expense;
      });
    });
  }

  ngOnDestroy(){
    if(this.expenseSub){
      this.expenseSub.unsubscribe();
    }
  }
}
