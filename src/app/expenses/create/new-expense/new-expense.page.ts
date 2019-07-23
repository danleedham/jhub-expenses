import { Expense } from "./../../expense.model";
import { ImagePickerComponent } from "./../../../shared/pickers/image-picker/image-picker.component";
import { ExpensesService } from "./../../expenses.service";
import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-new-expense",
  templateUrl: "./new-expense.page.html",
  styleUrls: ["./new-expense.page.scss"]
})
export class NewExpensePage implements OnInit {
  form: FormGroup;
  expenses: Expense[];
  private expensesSub: Subscription;

  myDate: string = new Date().toISOString();
  howManyExpenses: number;
  nextId: number;

  constructor(
    private expensesService: ExpensesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.expensesSub = this.expensesService.expenses.subscribe(expenses => {
      this.expenses = expenses;
    });
    const keys = Object.keys(localStorage);
    this.nextId = (Math.max.apply(Math, keys) + 1);
    console.log("Next Id:", this.nextId);

    this.form = new FormGroup({
      id: new FormControl(this.nextId.toString(), {}),
      title: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.min(0)]
      }),
      category: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      date: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null),
      imageData: new FormControl(null, {})
    });
  }

  onSubmitNewExpense() {
    if (!this.form.valid || !this.form.get("image").value) {
      console.log("Not Valid!");
      return;
    }

    console.log(this.form.value.imageData);
    // Save the image to localStorage
    const toSave = [
      this.form.value.id,
      this.form.value.title,
      this.form.value.description,
      this.form.value.category,
      this.form.value.imageData,
      +this.form.value.price,
      false,
      new Date(this.form.value.date)
    ];
    console.log("Saving expense to storage...");
    localStorage.setItem(this.form.value.id, JSON.stringify(toSave));
    this.router.navigate(["/expenses/tabs/manage"]);
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData !== "string") {

      // Image is an object. This should be imageFile.
      imageFile = imageData;
      this.myDate = imageFile.lastModifiedDate.toISOString();
      // ImageData should be a base64
      var reader = new FileReader();
      reader.readAsDataURL(imageData);
      reader.onload = function() {
        console.log(reader.result);
      };
    } else {
      imageFile = imageData;
      this.myDate = new Date().toISOString();
    }
    // console.log("Image as File: ", imageFile);

    this.form.patchValue({ imageData: imageData });
    this.form.patchValue({ image: imageFile });
  }
}
