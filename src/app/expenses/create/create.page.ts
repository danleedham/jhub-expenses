import { Router } from "@angular/router";
import { Expense } from "../expense.model";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ExpensesService } from "../expenses.service";
import { IonItemSliding } from "@ionic/angular";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-create",
  templateUrl: "./create.page.html",
  styleUrls: ["./create.page.scss"]
})
export class CreatePage implements OnInit, OnDestroy {
  expenses: Expense[];
  private expensesSub: Subscription;

  constructor(
    private expensesService: ExpensesService,
    private router: Router
  ) {}

  ngOnInit() {
    // console.log('ngOnInit');
    this.expensesSub = this.expensesService.expenses.subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  onEdit(expenseId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate([
      "/",
      "expenses",
      "tabs",
      "manage",
      "edit",
      expenseId
    ]);
    console.log("Editing Item", expenseId);
  }
  onDelete(expenseId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log("Deleting Item", expenseId);
  }

  ngOnDestroy() {
    if(this.expensesSub){
      this.expensesSub.unsubscribe();
    }
  }
}
