import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AnswerState} from '../../models/answer-state';
import {DataManipulationService} from '../../services/data-manipulation.service';
import {Category} from '../../models/basic-interview.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {NewBasicInterviewResolver} from '../../routes/new-basic-interview-resolver';

@Component({
  selector: 'app-basic-interview',
  templateUrl: './basic-interview.component.html',
  styleUrls: ['./basic-interview.component.scss']
})
export class BasicInterviewComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public readyQuestions;
  public allAnswers;
  public trueAnswers;
  public falseAnswers;
  public activeTab = 'all';
  public savedQuestions;
  @Input() public name;
  public newId = this.newBasicInterview.newId;

  private formNameSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              private dataManipulationService: DataManipulationService,
              private newBasicInterview: NewBasicInterviewResolver) {
  }

  public ngOnInit() {
    this.readyQuestions = this.dataManipulationService.loadQuestionnaire(this.dataManipulationService.getData(this.newId));
    localStorage.setItem('references', JSON.stringify([]));
    console.log('references', JSON.parse(localStorage.getItem('references')));
    console.log('ready questions: ', this.readyQuestions);
    // setInterval(() => {
    //   this.autoSave();
    // }, 60000);
    this.createForm();
  }

  // public ngOnInit() {
  //   if (this.newId === JSON.parse(localStorage.getItem('questionnaireData'))) {
  //     this.readyQuestions = this.dataManipulationService.loadQuestionnaire(this.dataManipulationService.getData(this.newId));
  //     console.log('ready questions: ', this.readyQuestions);
  //     // setInterval(() => {
  //     //   this.autoSave();
  //     // }, 60000);
  //   }
  // }

  public ngOnDestroy(): void {
    this.formNameSubscription.unsubscribe();
  }

  public serialize() {
    this.allAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct, AnswerState.Incorrect]);
    this.trueAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct]);
    this.falseAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Incorrect]);
  }

  public autoSave() {
    this.savedQuestions = this.dataManipulationService.saveQuestionnaire(this.readyQuestions);
    localStorage.setItem('questionnaireData_' + this.savedQuestions.id, JSON.stringify(this.savedQuestions));
    // this.addToReference();
    console.log('questionnaire from localStorage', JSON.parse(localStorage.getItem('questionnaireData')));
    // console.log(`JSON.parse(localStorage.getItem('references')`, JSON.parse(localStorage.getItem('references')));
    console.log('ready questions: ', this.readyQuestions);
    console.log('saved questions: ', this.savedQuestions);
  }

  public setTabTo(tabName) {
    this.activeTab = tabName;
  }

  public save() {
    this.serialize();
    this.autoSave();
  }

  // private addToReference() {
  //   localStorage.setItem('references', JSON.stringify(JSON.parse(localStorage.getItem('references')).push(this.reference)));
  //   JSON.parse(localStorage.getItem('references'));
  // }

  private createForm(): void {
    this.form = this.fb.group({
      name: this.readyQuestions.name,
    });

    this.formNameSubscription = this.form.get('name').valueChanges.subscribe((value: string) => {
      this.readyQuestions.name = value;
    });
  }
}

