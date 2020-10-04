import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from '../interfaces/todo';
import { NewTodoDialogComponent } from '../new-todo-dialog/new-todo-dialog.component';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todos: Todo[];
  doneTodosCount: number;

  constructor(
    private dialog: MatDialog,
    private todoService: TodoService
  ) { }

  openDialog() {
    let dialogRef = this.dialog.open(NewTodoDialogComponent, {disableClose: true});
    dialogRef.afterClosed().subscribe(result => {

      if(result == null) {
        return;
      }

      this.todoService.addTodo(result.title, result.content);
    })
  }

  getTodos(): void {
    this.todoService.getTodos().subscribe(
      (todos: Todo[]) => {
        this.todos = todos;
        this.doneTodosCount = (this.todos.filter(todo => todo.completed === true) || []).length;
      }
    );
  }

  ngOnInit(): void {
    this.getTodos();
  }

}
