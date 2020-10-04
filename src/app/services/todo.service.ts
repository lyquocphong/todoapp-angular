import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [
    {
      id: 1,
      title: 'Todo 1',
      content: 'Todo 1 content',
      completed: false,
      editing: false
    },
    {
      id: 2,
      title: 'Todo 2',
      content: 'Todo 2 content',
      completed: true,
      editing: false
    },
    {
      id: 3,
      title: 'Todo 3',
      content: 'Todo 3 content',
      completed: false,
      editing: false
    }
  ];

  todosSubject = new BehaviorSubject<Todo[]>(this.todos);

  constructor() {

  }

  saveTodo(savingTodo: Todo) {
    console.log('saving');
    this.todos = this.todos.map(todo => todo.id === savingTodo.id ? {...savingTodo} : {...todo});
    this.todosSubject.next(this.todos);
  }

  addTodo(title: string, content: string) {

    this.todos.push({
      id: Date.now(),
      title: title,
      content: content,
      completed: false,
      editing: false
    });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id != id);
    this.todosSubject.next(this.todos);
  }

  getTodo(id: number) {
    return this.todos.find(todo => todo.id === id);
  }

  getTodos(){
    return this.todosSubject.asObservable();
  }
}
