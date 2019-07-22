import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditExpensePage } from './edit-expense.page';

describe('EditExpensePage', () => {
  let component: EditExpensePage;
  let fixture: ComponentFixture<EditExpensePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditExpensePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditExpensePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
