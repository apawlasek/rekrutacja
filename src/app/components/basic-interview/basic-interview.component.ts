import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AnswerState} from '../../models/answer-state';
import {DataManipulationService} from '../../services/data-manipulation.service';
import {Category} from '../../models/basic-interview.model';

@Component({
  selector: 'app-basic-interview',
  templateUrl: './basic-interview.component.html',
  styleUrls: ['./basic-interview.component.scss']
})
export class BasicInterviewComponent implements OnInit {
  public readyQuestions;
  public allAnswers;
  public trueAnswers;
  public falseAnswers;
  public activeTab = 'all';
  public savedQuestions;

  constructor(private apiService: ApiService,
              private dataManipulationService: DataManipulationService) {
  }

  public ngOnInit() {
    this.readyQuestions = this.dataManipulationService.loadQuestionnaire(this.dataManipulationService.getData());
    console.log('ready questions: ', this.readyQuestions);
    // setInterval(() => {
    //   this.autoSave();
    // }, 60000);
  }

  public serialize() {
    this.allAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct, AnswerState.Incorrect]);
    this.trueAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct]);
    this.falseAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Incorrect]);
  }

  public autoSave() {
    this.savedQuestions = this.dataManipulationService.saveQuestionnaire(this.readyQuestions, 'Ben Kovalsky');
    localStorage.setItem('questionnaireData', JSON.stringify(this.savedQuestions));
    console.log('from localStorage', JSON.parse(localStorage.getItem('questionnaireData')));
    console.log('serialized data: ', this.dataManipulationService.getData());
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
}

