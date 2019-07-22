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
  private expensesSub: Subscription;

  constructor(private expensesService: ExpensesService) {}

  ngOnInit() {
    this.expensesSub = this.expensesService.expenses.subscribe(expenses => {
      this.loadedExpenses = expenses;
      this.relevantExpenses = expenses;
      console.log(this.relevantExpenses);
    });
  }

  ionViewDidEnter() {
    // console.log(this.loadedExpenses);
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === "all") {
      this.relevantExpenses = this.loadedExpenses;
    } else {
      this.relevantExpenses = this.loadedExpenses.filter(
        expense => expense.claimedFor !== true
      );
    }
    console.log(event.detail);
  }

  ngOnDestroy() {
    if (this.expensesSub) {
      this.expensesSub.unsubscribe();
    }
  }
}
