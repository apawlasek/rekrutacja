import {Component, OnDestroy, OnInit} from '@angular/core';
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
  public collapsed = '';
  public categoryNames;

  public id: string;
  public name: string;

  constructor(private apiService: ApiService,
              private dataManipulationService: DataManipulationService,
              private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.getIdAndName();
    this.loadData();
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
    this.categoryNames = this.getCategoryNames(this.readyQuestions);
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

  }

  public setTabTo(tabName) {
    this.activeTab = tabName;
  }

  public save() {
    this.serialize();
    this.autoSave();
    this.resultTabsVisible = true;
  }

  public getCategoryNames(readyQuestions) {
        return readyQuestions.questionnaireData.map((category) => category.categoryName);
  }

  public onCollapse(category) {
    if (this.collapsed === category) {
      this.collapsed = '';
    } else {
      this.collapsed = category;
    }
  }


}

