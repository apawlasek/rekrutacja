import {Injectable} from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NewBasicInterviewResolver implements Resolve<any> {
  public newId: string;
  constructor(private router: Router) {}

  public resolve(): Observable<any> {
    console.log(`resolver`);
    this.newId = (+(new Date())).toString(32);
    this.router.navigate(['/basic-interview', this.newId]);
    return Observable.empty();
  }
}
