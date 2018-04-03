import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CurrentStateService {

  private intervieweeSubject: BehaviorSubject<string>;

  public interviewee$: Observable<string>;

  constructor() {
    this.intervieweeSubject = new BehaviorSubject<string>('');
    this.interviewee$ = this.intervieweeSubject.asObservable();
  }

  public setInterviewee(value: string): void {
    this.intervieweeSubject.next(value);
  }

}
