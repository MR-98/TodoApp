import {Status} from './status';
import {Priority} from './priority';

export class Task {
  name: string;
  status: Status;
  description: string;
  // deadline: Date;
  priority: Priority;

  constructor(name: string, status: Status, description: string, /*deadline: Date,*/ priority: Priority) {
    this.name = name;
    this.status = status;
    this.description = description;
    // this.deadline = deadline;
    this.priority = priority;
  }
}
