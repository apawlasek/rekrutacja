import {Routes} from '@angular/router';

import {ListComponent} from '../components/list/list.component';
import {BasicInterviewComponent} from '../components/basic-interview/basic-interview.component';
import {NewBasicInterviewResolver} from './new-basic-interview-resolver';

export const appRoutes: Routes = [
  {path: '', component: ListComponent},
  {path: 'basic-interview/new', component: BasicInterviewComponent, resolve: {
    newBasicInterview: NewBasicInterviewResolver,
    }},
  {path: 'basic-interview/:id', component: BasicInterviewComponent},
];
