import { ExpensesPage } from "./expenses.page";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {
    path: 'tabs',
    component: ExpensesPage,
    children: [
      {
        path: "discover",
        children: [
          {
            path: "", // /tabs/discover
            loadChildren: "./discover/discover.module#DiscoverPageModule"
          },
          {
            path: ":expenseId", // /tabs/discover/expenseId
            loadChildren:
              "./discover/expense-detail/expense-detail.module#ExpenseDetailPageModule"
          }
        ]
      },
      {
        path: "manage",
        children: [
          {
            path: "", // /tabs/manage
            loadChildren: "./create/create.module#CreatePageModule"
          },
          {
            path: "new",  // /tabs/manage/new
            loadChildren:
              "./create/new-expense/new-expense.module#NewExpensePageModule"
          },
          {
            path: ":expenseId", // /tabs/manage/expenseId
            loadChildren:
              "./create/view-expense/view-expense.module#ViewExpensePageModule"
          },
          {
            path: "edit/:expenseId", // /tabs/manage/edit/expenseId
            loadChildren:
              "./create/edit-expense/edit-expense.module#EditExpensePageModule"
          }
        ]
      },
      {
        path: '',
        redirectTo: "/expenses/tabs/discover",
        pathMatch: "full"
      }
    ]
  },
  {
    path: '',
    redirectTo: "/expenses/tabs/discover",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule {}
