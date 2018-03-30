import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AnswerState} from '../../models/answer-state';
import {DataManipulationService} from '../../services/data-manipulation.service';
import {ActivatedRoute} from '@angular/router';

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
  public savedQuestions;
  public autosaveInterval;
  public resultTabsVisible = false;
  public categoriesObj = {};
  public id: string;
  public name: string;
  public correctAnswers = {};

  constructor(private apiService: ApiService,
              private dataManipulationService: DataManipulationService,
              private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.getIdAndName();
    this.loadData();
    this.correctAnswers = this.dataManipulationService.summarizeAnswers((this.readyQuestions));
    this.autosaveInterval = setInterval(() => {
      this.autoSave();
    }, 10000);
  }


  public ngOnDestroy() {
    clearInterval(this.autosaveInterval);
  }

  public getIdAndName() {
    this.id = this.route.snapshot.params['id'];
    const ref = JSON.parse(localStorage.getItem('references'));
    const refObj = ref.find(obj => obj.id === this.id);
    this.name = refObj.name;
  }

  public loadData() {
    const questionnaireString = localStorage.getItem('questionnaireData_' + this.id);
    if (typeof  questionnaireString === 'string') {
      this.readyQuestions = this.dataManipulationService.loadQuestionnaire(JSON.parse(questionnaireString));
    } else {
      this.readyQuestions = this.dataManipulationService.loadQuestionnaire(this.dataManipulationService.getData(this.id, this.name));
    }
    this.getCategoriesObj(this.readyQuestions);
    console.log('readyquest', this.readyQuestions.questionnaireData);
  }


  public serialize() {
    this.allAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct, AnswerState.Incorrect]);
    this.trueAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct]);
    this.falseAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Incorrect]);


  }

  public autoSave() {
    this.savedQuestions = this.dataManipulationService.saveQuestionnaire(this.readyQuestions);
    localStorage.setItem('questionnaireData_' + this.savedQuestions.id, JSON.stringify(this.savedQuestions));
    console.log('Questionnaire autosaved!');
    this.correctAnswers = this.dataManipulationService.summarizeAnswers((this.readyQuestions));
  }

  public setTabTo(tabName) {
    this.activeTab = tabName;
  }

  public save() {
    this.serialize();
    this.autoSave();
    this.resultTabsVisible = true;
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
