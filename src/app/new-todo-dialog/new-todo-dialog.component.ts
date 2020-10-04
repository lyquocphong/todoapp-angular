import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-todo-dialog',
  templateUrl: './new-todo-dialog.component.html',
  styleUrls: ['./new-todo-dialog.component.css']
})
export class NewTodoDialogComponent implements OnInit {

  newTodoForm: FormGroup;
  name: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder,
    public dialogRef: MatDialogRef<NewTodoDialogComponent>
  ) {
    // To initialize FormGroup
    this.newTodoForm = fb.group({
      'title': [null, Validators.required],
      'content': [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  // Executed When Form Is Submitted
  onFormSubmit(form:NgForm)
  {
    this.dialogRef.close(form);
  }

  onFormClose() {
    this.dialogRef.close(null);
  }

}
