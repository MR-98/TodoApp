import {Injectable} from '@angular/core';
import {Task} from '../models/task';
import {Status} from '../models/status';
import {Priority} from '../models/priority';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  open: Task[] = [
    new Task('Wyprowadzić psa', Status.Open, '', undefined, Priority.High),
    new Task('Zrobić zakupy', Status.Open, 'testowy opis2', undefined, Priority.High)
  ];

  openSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.open);

  inProgress: Task[] = [
    new Task('Pobawić się z psem', Status.InProgress, 'testowy opis', undefined, Priority.Low),
    new Task('Iść do apteki', Status.InProgress, '', undefined, Priority.High)
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

  changeStatus(task: Task, targetStatus: Status, targetIndex: number) {
    if (targetStatus === Status.Open) {
      this.open[targetIndex].status = Status.Open;
    } else if (targetStatus === Status.InProgress) {
      this.inProgress[targetIndex].status = Status.InProgress;
    } else {
      this.done[targetIndex].status = Status.Done;
    }
  }

  sort(status: Status, sortBy: string) {
    if (status === Status.Open) {
      this.open.sort((todoA, todoB) => this.compareTodos(todoA, todoB, sortBy));
    } else if (status === Status.InProgress) {
      this.inProgress.sort((todoA, todoB) => this.compareTodos(todoA, todoB, sortBy));
    } else {
      this.done.sort((todoA, todoB) => this.compareTodos(todoA, todoB, sortBy));
    }
  }

  compareTodos(todoA: Task, todoB: Task, sortBy: string) {
    if (sortBy === 'date') {
      if (todoA.deadline === todoB.deadline) {
        return 0;
      } else if (todoA.deadline === undefined && todoB.deadline !== undefined) {
        return 1;
      } else if (todoA.deadline !== undefined && todoB.deadline === undefined) {
        return -1;
      } else {
        return (todoA.deadline.getTime() < todoB.deadline.getTime()) ? -1 : (todoA.deadline.getTime() > todoB.deadline.getTime()) ? 1 : 0;
      }
    } else {
      const priorityA = todoA.priority === Priority.High ? 0 : todoA.priority === Priority.Medium ? 1 : 2;
      const priorityB = todoB.priority === Priority.High ? 0 : todoB.priority === Priority.Medium ? 1 : 2;
      return (priorityA < priorityB) ? -1 : (priorityA > priorityB) ? 1 : 0;
    }
  }
}
