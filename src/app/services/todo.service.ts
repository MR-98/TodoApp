import {Injectable} from '@angular/core';
import {Task} from '../models/task';
import {Status} from '../models/status';
import {Priority} from '../models/priority';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  open: Task[] = [
    new Task('Wyprowadzić psa', Status.Open, 'testowy opis', undefined, Priority.High),
    new Task('Zrobić zakupy', Status.Open, 'testowy opis2', undefined, Priority.High)
  ];

  openSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.open);

  inProgress: Task[] = [
    new Task('Pobawić się z psem', Status.InProgress, 'testowy opis', undefined, Priority.Low),
    new Task('Iść do apteki', Status.InProgress, 'testowy opis2', undefined, Priority.High)
  ];

  inProgressSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.inProgress);

  done: Task[] = [
    new Task('Wziąć prysznic', Status.Done, 'testowy opis', undefined, Priority.Medium),
    new Task('Umyć naczynia', Status.Done, 'testowy opis2', undefined, Priority.Medium)
  ];

  doneSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.done);

  constructor() {
  }

  getOpenTodos(): BehaviorSubject<Task[]> {
    return this.openSubject;
  }

  getInProgressTodos(): BehaviorSubject<Task[]> {
    return this.inProgressSubject;
  }

  getDoneTodos(): BehaviorSubject<Task[]> {
    return this.doneSubject;
  }

  getTodo(id: string) {
    return this.open.concat(this.inProgress).concat(this.done).find(i => i.id === id);
  }

  updateTodo(id: string, todo: Task) {
    if (todo.status === Status.Open) {
      const objIndex = this.open.findIndex((obj => obj.id === id));
      this.open[objIndex] = todo;
      this.openSubject.next(this.open);
    } else if (todo.status === Status.InProgress) {
      const objIndex = this.inProgress.findIndex((obj => obj.id === id));
      this.inProgress[objIndex] = todo;
      this.inProgressSubject.next(this.inProgress);
    } else {
      const objIndex = this.done.findIndex((obj => obj.id === id));
      this.done[objIndex] = todo;
      this.doneSubject.next(this.done);
    }
  }
}
