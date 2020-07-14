import {Status} from './status';
import {Priority} from './priority';

import * as uuid from 'uuid';

export class Task {
  id: string;
  name: string;
  status: Status;
  description: string;
  deadline: Date;
  priority: Priority;

  constructor(name: string, status: Status, description: string, deadline: Date, priority: Priority) {
    this.id = uuid.v4();
    this.name = name;
    this.status = status;
    this.description = description;
    this.deadline = deadline;
    this.priority = priority;
  }
}
