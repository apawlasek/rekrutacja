import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AnswerState} from '../../models/answer-state';
import {DataManipulationService} from '../../services/data-manipulation.service';
import {ActivatedRoute} from '@angular/router';
import {CurrentStateService} from '../../services/current-state.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-basic-interview-preview',
  templateUrl: './basic-interview-preview.component.html',
  styleUrls: ['./basic-interview-preview.component.scss']
})
export class BasicInterviewPreviewComponent implements OnInit, OnDestroy {
  public readyQuestions;
  public allAnswers;
  public trueAnswers;
  public falseAnswers;
  public activeTab = 'all';
  public resultTabsVisible = false;
  public categoriesObj = {};
  public id: string;
  public name: string;
  public summarizedAnswers = {};
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
    this.serialize();
  }

  public ngOnDestroy() {
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
    const questionnaireString = localStorage.getItem('questionnaireData_' + this.id);
    if (typeof  questionnaireString === 'string') {
      this.readyQuestions = this.dataManipulationService.loadQuestionnaire(JSON.parse(questionnaireString));
    } else {
      this.readyQuestions = this.dataManipulationService.loadQuestionnaire(this.dataManipulationService.getData(this.id, this.name));
    }
    this.getCategoriesObj(this.readyQuestions);
    console.log('ready quest', this.readyQuestions.questionnaireData);
  }


  public serialize() {
    this.allAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct, AnswerState.Incorrect]);
    this.trueAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct]);
    this.falseAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Incorrect]);


  }

  public setTabTo(tabName) {
    this.activeTab = tabName;
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

  public onResultTabsVisible() {
    this.resultTabsVisible = true;
  }

}

