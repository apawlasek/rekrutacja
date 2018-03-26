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
  public newId: string = this.newBasicInterview.newId;
  public reference;

  private formNameSubscription: Subscription;

  constructor(private fb: FormBuilder,
              private apiService: ApiService,
              private dataManipulationService: DataManipulationService,
              private newBasicInterview: NewBasicInterviewResolver) {
  }

  public ngOnInit() {
    this.readyQuestions = this.dataManipulationService.loadQuestionnaire(this.dataManipulationService.getData(this.newId));
    this.reference = {id: this.newId, name: this.readyQuestions.name};
    console.log('references', JSON.parse(localStorage.getItem('references')));
    console.log('ready questions: ', this.readyQuestions);
    console.log(`this.readyQuestions.name`, this.readyQuestions.name);
    this.addToReference();
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
    console.log('questionnaire from localStorage', JSON.parse(localStorage.getItem('questionnaireData')));
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

  public addToReference() {
    let ref = [];
    const refString = localStorage.getItem('references');
    if (typeof refString === 'string') {
      ref = JSON.parse(refString);
    }
    console.log(`ref`, ref);
    if (ref !== [] && ref.some(person => person.id === this.reference.id)) {
      console.log(`dupa`);

    } else {
      ref.push(this.reference);
      console.log('spushowany ref: ', ref);
      localStorage.setItem('references', JSON.stringify(ref));
    }

    // if (ref.some(person => person.id === this.reference.id)) {
    //   ref.push(this.reference);
    //   localStorage.setItem('references', JSON.stringify(ref));
    // } else {
    //   console.log(`dupa`);
    // }
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: this.readyQuestions.name,
    });

    this.formNameSubscription = this.form.get('name').valueChanges.subscribe((value: string) => {
      this.readyQuestions.name = value;
    });
  }
}

