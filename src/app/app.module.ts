import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {HeaderComponent} from './components/header/header.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {EditTodoComponent} from './components/edit-todo/edit-todo.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {DateAdapter, MAT_DATE_FORMATS, MatNativeDateModule} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {APP_DATE_FORMATS, AppDateAdapter} from './utils/app-date-adapter';

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    HeaderComponent,
    EditTodoComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
    DragDropModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
