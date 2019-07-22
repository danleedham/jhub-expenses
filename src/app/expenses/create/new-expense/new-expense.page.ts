import { Expense } from './../../expense.model';
import { ImagePickerComponent } from "./../../../shared/pickers/image-picker/image-picker.component";
import { ExpensesService } from "./../../expenses.service";
import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

function base64toBlob(base64Data: any, contentType: any) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

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
      this.howManyExpenses = expenses.length;
      this.nextId = this.howManyExpenses + 1;
    });
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
  onSubmitNewExpense(form: NgForm) {
    if (!this.form.valid || !this.form.get("image").value) {
      console.log("Not Valid!");
      return;
    }

    // Save the image to localStorage
    const fr = new FileReader();
    fr.onload = () => {
      let toSave = [
        this.form.value.id,
        this.form.value.title,
        this.form.value.description,
        this.form.value.category,
        fr.result.toString(),
        +this.form.value.price,
        false,
        new Date(this.form.value.date)
      ];
      localStorage.setItem(this.form.value.id, JSON.stringify(toSave));
      this.expensesService.addExpense(
        this.form.value.id,
        this.form.value.title,
        this.form.value.description,
        this.form.value.category,
        fr.result.toString(),
        +this.form.value.price,
        false,
        new Date(this.form.value.date)
      );
    };
    fr.readAsDataURL(this.form.value.image);

    this.router.navigate(["/expenses/tabs/manage"]);
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    if (typeof imageData === "string") {
      try {
        const imageFile = base64toBlob(
          imageData.replace("data:image/jpeg;base64,", ""),
          "image/jpeg"
        );
      } catch (error) {
        console.log(error);
        return;
      }
      this.form.patchValue({ imageData: imageData });
    } else {
      imageFile = imageData;
      this.myDate = imageFile.lastModifiedDate.toISOString();
      this.form.patchValue({ imageData: "" });
    }
    this.form.patchValue({ image: imageFile });
  }
}
