import {Route} from '@angular/router';

import {ListComponent} from '../components/list/list.component';
import {BasicInterviewComponent} from '../components/basic-interview/basic-interview.component';
import {BasicInterviewCreateComponent} from '../components/basic-interview-create/basic-interview-create.component';

export const appRoutes: Route[] = [
  {path: '', component: ListComponent},
  {path: 'basic-interview-create', component: BasicInterviewCreateComponent},
  // {path: 'basic-interview/new', component: BasicInterviewComponent, resolve: {
  //   newBasicInterview: NewBasicInterviewResolver,
  //   }},
  {path: 'basic-interview/:id', component: BasicInterviewComponent},
];
