import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ShareService {
  role = new BehaviorSubject<string>("default message");
  currentMessage = this.role.asObservable();

  constructor() { }

  changeRole(message) {
    this.role.next(message);
  }

}
