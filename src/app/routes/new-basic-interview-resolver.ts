import {Injectable, Input} from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class NewBasicInterviewResolver implements Resolve<any> {
  @Input() public id;
  constructor(private router: Router) {}

  public resolve(): Observable<any> {
    console.log(`resolver`);
    this.router.navigate(['/basic-interview', this.id]);
    // this.router.navigate(['/basic-interview']);
    return Observable.empty();
  }
}
