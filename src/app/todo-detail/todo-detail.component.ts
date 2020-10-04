import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  id: number;
  todo: Todo;
  editingTodo: Todo;

  deleteTodo(): void {

    if (window.confirm(`Do you want to delete '${this.todo.title}'?`)) {
      this.todoService.deleteTodo(this.todo.id);
      alert('Todo deleted');
      this.router.navigate(['']);
    }
  }

  saveTodo(): void {

    if (window.confirm(`Are you sure you want to save?`)) {
      this.todo = this.editingTodo;
      this.editingTodo = null;
      this.todo.editing = false;
      this.todoService.saveTodo(this.todo);
    }
  }

  cancelEditing(): void {
    this.editingTodo = null;
    this.todo.editing = false;
  }

  editTodo(): void {
    this.editingTodo = Object.assign({}, this.todo);
    this.todo.editing = true;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this.todo = this.todoService.getTodo(this.id);
    });
  }
}
