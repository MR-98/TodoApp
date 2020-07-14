import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TodoService} from '../../services/todo.service';
import {Task} from '../../models/task';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  id: string;
  todo: Task;
  editTodoForm: any;

  toastMsg = 'Zmiany zostały zapisane';

  constructor(private route: ActivatedRoute, private service: TodoService, private formBuilder: FormBuilder,
              private toast: MatSnackBar, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      this.todo = this.service.getTodo(this.id);
      this.createForm();
    });
  }

  createForm() {
    this.editTodoForm = this.formBuilder.group({
      name: [this.todo.name, [Validators.required]],
      priority: [this.todo.priority, [Validators.required]],
      deadline: [this.todo.deadline],
      description: [this.todo.description],
      status: [this.todo.status]
    });
  }

  onSubmit() {
    this.service.updateTodo(this.id, this.editTodoForm.value);
    this.toast.open(this.toastMsg, null, {
      duration: 2000,
    });
  }

  discardChanges() {
    this.router.navigate(['home']);
  }
}
