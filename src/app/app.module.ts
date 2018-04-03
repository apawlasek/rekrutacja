import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import 'rxjs/add/observable/empty';

import {AppComponent} from './components/root/app.component';
import {BasicInterviewComponent} from './components/basic-interview/basic-interview.component';
import {ApiService} from './services/api.service';
import {TriStateCheckboxComponent} from './components/tri-state-checkbox/tri-state-checkbox.component';
import {ReactiveFormsModule} from '@angular/forms';
import {InputBoxComponent} from './components/input-box/input-box.component';
import {BasicInterviewResultComponent} from './components/basic-interview-result/basic-interview-result.component';
import {DataManipulationService} from './services/data-manipulation.service';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './components/list/list.component';
import {appRoutes} from './routes/router';
import {NewBasicInterviewResolver} from './routes/new-basic-interview-resolver';
import {BasicInterviewCreateComponent} from './components/basic-interview-create/basic-interview-create.component';
import {CurrentStateService} from './services/current-state.service';
import { TranslateAnswerStatePipe } from './pipes/translate-answer-state.pipe';


@NgModule({
  declarations: [
    AppComponent,
    BasicInterviewComponent,
    TriStateCheckboxComponent,
    InputBoxComponent,
    BasicInterviewResultComponent,
    ListComponent,
    BasicInterviewCreateComponent,
    TranslateAnswerStatePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    ApiService,
    DataManipulationService,
    DataManipulationService,
    NewBasicInterviewResolver,
    CurrentStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
