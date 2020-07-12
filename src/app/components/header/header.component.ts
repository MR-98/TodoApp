import { Component, OnInit } from '@angular/core';
import {faCalendarCheck} from '@fortawesome/free-regular-svg-icons/faCalendarCheck';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Todo App';
  faCalendarCheck = faCalendarCheck;

  constructor() { }

  ngOnInit(): void {
  }

}
