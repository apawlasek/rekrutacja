import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AnswerState} from '../../models/answer-state';
import {DataManipulationService} from '../../services/data-manipulation.service';
import {ActivatedRoute} from '@angular/router';
import {CurrentStateService} from '../../services/current-state.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-basic-interview',
  templateUrl: './basic-interview.component.html',
  styleUrls: ['./basic-interview.component.scss']
})
export class BasicInterviewComponent implements OnInit, OnDestroy {
  public readyQuestions;
  public allAnswers;
  public trueAnswers;
  public falseAnswers;
  public activeTab = 'all';
  public autosaveInterval;
  public resultTabsVisible = false;
  public categoriesObj = {};
  public id: string;
  public name: string;
  public summarizedAnswers = {};
  public form: FormGroup;
  public references;
  public currentPersonReferenceObj;
  public answerState = AnswerState;

  constructor(private apiService: ApiService,
              private dataManipulationService: DataManipulationService,
              private route: ActivatedRoute,
              private currentStateService: CurrentStateService,
              private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.getIdAndName();
    this.loadData();
    this.summarizedAnswers = this.dataManipulationService.summarizeAnswers((this.readyQuestions));
    this.autosaveInterval = setInterval(() => {
      this.autoSave();
    }, 10000);
  }

  public ngOnDestroy() {
    clearInterval(this.autosaveInterval);
    this.currentStateService.setInterviewee('');
  }

  public getIdAndName() {
    this.id = this.route.snapshot.params['id'];
    this.references = JSON.parse(localStorage.getItem('references'));
    this.currentPersonReferenceObj = this.references.find(obj => obj.id === this.id);
    this.name = this.currentPersonReferenceObj.name;
    setTimeout(() => {
      this.currentStateService.setInterviewee(this.name);
    });
  }


  public loadData() {
    this.createForm();
    const questionnaireString = localStorage.getItem('questionnaireData_' + this.id);
    if (typeof  questionnaireString === 'string') {
      this.readyQuestions = this.dataManipulationService.loadQuestionnaire(JSON.parse(questionnaireString));
    } else {
      this.readyQuestions = this.dataManipulationService.loadQuestionnaire(this.dataManipulationService.getData(this.id, this.name));
    }
    this.getCategoriesObj(this.readyQuestions);
    console.log('ready quest', this.readyQuestions.questionnaireData);
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: this.name,
    });
 }

  public onNameChange() {
    this.form.get('name').markAsPristine();
    this.name = this.form.get('name').value;
    console.log(`this.name `, this.name);
    this.updateReferences();
    this.readyQuestions.name = this.name;
    this.autoSave();
    this.currentStateService.setInterviewee(this.name);
  }

  public updateReferences() {
    this.currentPersonReferenceObj.name = this.name;
    localStorage.setItem('references', JSON.stringify(this.references));


  }


  public serialize() {
    this.allAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct, AnswerState.Incorrect]);
    this.trueAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct]);
    this.falseAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Incorrect]);


  }

  public autoSave() {
    const savedQuestions = this.dataManipulationService.saveQuestionnaire(this.readyQuestions);
    localStorage.setItem('questionnaireData_' + savedQuestions.id, JSON.stringify(savedQuestions));
    console.log('Questionnaire autosaved!');
    this.summarizedAnswers = this.dataManipulationService.summarizeAnswers((this.readyQuestions));
    this.serialize();
  }

  public setTabTo(tabName) {
    this.activeTab = tabName;
  }

  public save() {
    this.autoSave();
    this.resultTabsVisible = true;
    this.currentPersonReferenceObj.modification = Date.now();
    localStorage.setItem('references', JSON.stringify(this.references));

  }


  public getCategoriesObj(readyQuestions) {
    const categoryNames = readyQuestions.questionnaireData.map((category) => category.categoryName);
    categoryNames.map((categoryName) => {
      this.categoriesObj[categoryName] = false;
    });
  }

  public onCollapse(category) {
    this.categoriesObj[category] = !this.categoriesObj[category];
  }


}
