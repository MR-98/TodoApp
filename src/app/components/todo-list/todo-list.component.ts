import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Task} from '../../models/task';
import {TodoService} from '../../services/todo.service';
import {Status} from '../../models/status';
import {Priority} from '../../models/priority';
import {Router} from '@angular/router';
import {faAngleDoubleUp, faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';
import {faClock} from '@fortawesome/free-regular-svg-icons/faClock';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  open: Task[];
  inProgress: Task[];
  done: Task[];

  firstListId = '0';
  secondListId = '1';
  thirdListId = '2';

  major = faAngleDoubleUp;
  minor = faAngleUp;
  trivial = faAngleDown;
  clock = faClock;

  constructor(private todoService: TodoService, private router: Router) {
  }

  ngOnInit(): void {
    this.todoService.getOpenTodos().subscribe(todos => {
      this.open = todos;
    });
    this.todoService.getInProgressTodos().subscribe(todos => {
      this.inProgress = todos;
    });
    this.todoService.getDoneTodos().subscribe(todos => {
      this.done = todos;
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.changeStatus(event);
    }
  }

  addNewTask() {
    this.open.unshift(new Task('Tu wprowadź swoją nazwę', Status.Open, '', undefined, Priority.Medium));
  }

  editTodo(item: Task) {
    this.router.navigate(['editTodo'], {queryParams: {id: item.id}});
  }

  changeStatus(event: CdkDragDrop<Task[]>) {
    let targetStatus: Status;
    if (event.container.id === '0') {
      targetStatus = Status.Open;
    } else if (event.container.id === '1') {
      targetStatus = Status.InProgress;
    } else {
      targetStatus = Status.Done;
    }
    this.todoService.changeStatus(event.container.data[event.currentIndex], targetStatus, event.currentIndex);
  }

  sort(status: string, sortBy: string) {
    if (status === 'open') {
      this.todoService.sort(Status.Open, sortBy);
    } else if (status === 'inProgress') {
      this.todoService.sort(Status.InProgress, sortBy);
    } else {
      this.todoService.sort(Status.Done, sortBy);
    }
  }

  getIcon(item: Task) {
    if (item.priority === Priority.High) {
      return this.major;
    } else if (item.priority === Priority.Medium) {
      return this.minor;
    } else {
      return this.trivial;
    }
  }

  getIconColor(item: Task) {
    if (item.priority === Priority.High) {
      return 'red';
    } else if (item.priority === Priority.Medium) {
      return 'green';
    } else {
      return 'gray';
    }
  }
}
