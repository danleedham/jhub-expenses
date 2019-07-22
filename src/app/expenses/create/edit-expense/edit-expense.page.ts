import { NgForm } from "@angular/forms";
import { NavController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ExpensesService } from "../../expenses.service";
import { Expense } from "../../expense.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-expense",
  templateUrl: "./edit-expense.page.html",
  styleUrls: ["./edit-expense.page.scss"]
})
export class EditExpensePage implements OnInit, OnDestroy {
  @ViewChild("f") form: NgForm;
  expense: Expense;
  private expenseSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private expensesService: ExpensesService,
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("expenseId")) {
        this.navCtrl.navigateBack("/expenses/tabs/manage");
        return;
      }
      this.expenseSub = this.expensesService
        .getExpense(paramMap.get("expenseId"))
        .subscribe(expense => {
          this.expense = expense;
          console.log(this.expense);
        });
    });
  }

  onSubmitEditExpense() {
    if (!this.form.valid || !this.expensesValid) {
      return;
    }
    this.expensesService
      .updateExpense(
        this.expense.id,
        this.form.value.title,
        this.form.value.description,
        this.form.value.category,
        this.form.value.price,
        this.form.value.claimedFor
      )
      .subscribe(() => {
        console.log("Updated");
        this.form.reset;
        this.router.navigate(["/expenses/tabs/manage"]);
      });
  }

  expensesValid() {
    const expensePrice = this.form.value["price"];
    return expensePrice > 0;
  }

  ngOnDestroy() {
    if (this.expenseSub) {
      this.expenseSub.unsubscribe();
    }
  }
}
