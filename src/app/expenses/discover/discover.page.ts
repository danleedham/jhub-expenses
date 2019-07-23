import { Subscription } from "rxjs";
import { ExpensesService } from "./../expenses.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Expense } from "../expense.model";
import { SegmentChangeEventDetail } from "@ionic/core";
@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"]
})
export class DiscoverPage implements OnInit {
  loadedExpenses: Expense[];
  relevantExpenses: Expense[];
  displayExpensesAmount = 0;
  private expensesSub: Subscription;

  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    this.expensesSub = this.expensesService.expenses.subscribe(expenses => {
      this.loadedExpenses = expenses;
      this.relevantExpenses = expenses;
    });
  }

  ionViewWillEnter() {
    this.expensesService.fetchExpenses();
    this.relevantExpenses.forEach(element => {
      this.displayExpensesAmount += element.price;
    });
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === "all") {
      this.relevantExpenses = this.loadedExpenses;
      this.displayExpensesAmount = 0;
      this.relevantExpenses.forEach(element => {
        this.displayExpensesAmount += element.price;
      });
    
        } else {
      this.relevantExpenses = this.loadedExpenses.filter(
        expense => expense.claimedFor !== true
      );
      this.displayExpensesAmount = 0;
      this.relevantExpenses.forEach(element => {
        this.displayExpensesAmount += element.price;
      });
    }
    // console.log(event.detail);
  }

  ngOnDestroy() {
    if (this.expensesSub) {
      this.expensesSub.unsubscribe();
    }
  }
}
