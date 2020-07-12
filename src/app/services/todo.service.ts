import {Injectable} from '@angular/core';
import {Task} from '../models/task';
import {Status} from '../models/status';
import {Priority} from '../models/priority';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  open: Task[] = [
    new Task('Wyprowadzić psa', Status.Open, 'testowy opis', Priority.High),
    new Task('Zrobić zakupy', Status.Open, 'testowy opis2', Priority.High)
  ];

  inProgress: Task[] = [
    new Task('Pobawić się z psem', Status.InProgress, 'testowy opis', Priority.Low),
    new Task('Iść do apteki', Status.InProgress, 'testowy opis2', Priority.High)
  ];

  done: Task[] = [
    new Task('Wziąć prysznic', Status.Done, 'testowy opis', Priority.Medium),
    new Task('Umyć naczynia', Status.Done, 'testowy opis2', Priority.Medium)
  ];

  constructor() { }

  getOpenTodos(): Task[] {
    return this.open;
  }

  getInProgressTodos(): Task[] {
    return this.inProgress;
  }

  getDoneTodos(): Task[] {
    return this.done;
  }
}
