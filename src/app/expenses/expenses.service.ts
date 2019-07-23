import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { Expense } from "./expense.model";
import { take, map, tap } from "rxjs/operators";

interface ExpenseData {
  availableFrom: string;
  availableTo: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: "root"
})
export class ExpensesService {
  private _expenses = new BehaviorSubject<Expense[]>([]);

  get expenses() {
    return this._expenses.asObservable();
  }

  constructor() {}

  allStorage() {
    var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    return values;
  }

  fetchExpenses() {
    console.log("Getting Expenses...");
    const expenses = [];
    const resData = this.allStorage();
    // console.log(resData);
    for (const key in resData) {
      if (resData.hasOwnProperty(key)) {
        expenses.push(
          new Expense(
            key,
            resData[key][1],
            resData[key][2],
            resData[key][3],
            resData[key][4],
            resData[key][5],
            resData[key][6],
            resData[key][7]
          )
        );
      }
    }
    this._expenses.next(expenses);
  }

  getExpense(id: string) {
    return this.expenses.pipe(
      take(1),
      map(expenses => {
        return { ...expenses.find(e => e.id === id) };
      })
    );
  }

  addExpense(
    id: string,
    title: string,
    description: string,
    category: string,
    imageData: string,
    price: number,
    claimedFor: boolean,
    dateTime: Date
  ) {
    const newExpense = new Expense(
      id,
      title,
      description,
      category,
      imageData,
      price,
      claimedFor,
      dateTime
    );
    this.expenses.pipe(take(1)).subscribe(expenses => {
      this._expenses.next(expenses.concat(newExpense));
    });
  }

  updateExpense(
    expenseId: string,
    title: string,
    description: string,
    category: string,
    price: number,
    claimedFor: boolean
  ) {
    return this.expenses.pipe(
      take(1),
      tap(expenses => {
        const updatedExpenseIndex = expenses.findIndex(
          ex => ex.id === expenseId
        );
        const updatedExpenses = [...expenses];
        const oldExpense = updatedExpenses[updatedExpenseIndex];
        updatedExpenses[updatedExpenseIndex] = new Expense(
          oldExpense.id,
          title,
          description,
          category,
          oldExpense.imageData,
          price,
          claimedFor,
          oldExpense.dateTime
        );
        this._expenses.next(updatedExpenses);
        // Now Update to Local Storage
        let toSave = [
          oldExpense.id,
          title,
          description,
          category,
          oldExpense.imageData,
          price,
          claimedFor,
          oldExpense.dateTime];
        localStorage.setItem(oldExpense.id, JSON.stringify(toSave));
        console.log("Updating " + oldExpense.id + " with new data");
      })
    );
  }
}
