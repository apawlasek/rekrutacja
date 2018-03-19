import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './components/root/app.component';
import { BasicInterviewComponent } from './components/basic-interview/basic-interview.component';
import {ApiService} from './services/api.service';
import { TriStateCheckboxComponent } from './components/tri-state-checkbox/tri-state-checkbox.component';
import {ReactiveFormsModule} from '@angular/forms';
import { InputBoxComponent } from './components/input-box/input-box.component';
import {DisplayDataService} from './services/display-data.service';
import {DisplayOutputService} from './services/display-output.service';
import { BasicInterviewResultComponent } from './components/basic-interview-result/basic-interview-result.component';


@NgModule({
  declarations: [
    AppComponent,
    BasicInterviewComponent,
    TriStateCheckboxComponent,
    InputBoxComponent,
    BasicInterviewResultComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, DisplayDataService, DisplayOutputService],
  bootstrap: [AppComponent]
})
export class AppModule { }
