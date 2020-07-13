import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Task} from '../../models/task';
import {TodoService} from '../../services/todo.service';
import {Status} from '../../models/status';
import {Priority} from '../../models/priority';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{

  open: Task[];
  inProgress: Task[];
  done: Task[];


  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.open = this.todoService.getOpenTodos();
    this.inProgress = this.todoService.getInProgressTodos();
    this.done = this.todoService.getDoneTodos();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  addNewTask() {
    this.open.unshift(new Task('Tu wprowadź swoją nazwę', Status.Open, '', Priority.Medium));
  }
}
