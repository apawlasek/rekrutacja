import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AnswerState} from '../../models/answer-state';
import {DataManipulationService} from '../../services/data-manipulation.service';
import {ActivatedRoute} from '@angular/router';

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

  public id: string;
  public name: string;

  constructor(private apiService: ApiService,
              private dataManipulationService: DataManipulationService,
              private route: ActivatedRoute) { }

  public ngOnInit() {
    this.getIdAndName();
    this.readyQuestions = this.dataManipulationService.loadQuestionnaire(this.dataManipulationService.getData(this.id, this.name));
    console.log('references', JSON.parse(localStorage.getItem('references')));
    console.log('ready questions: ', this.readyQuestions);
    console.log(`this.readyQuestions.name`, this.readyQuestions.name);
    // setInterval(() => {
    //   this.autoSave();
    // }, 60000);
  }

  public getIdAndName() {
    this.id  = this.route.snapshot.params['id'];
    const ref = JSON.parse(localStorage.getItem('references'));
    console.log(`ref from getName()`, ref);
    const refObj = ref.find(obj => obj.id === this.id);
    this.name = refObj.name;
    console.log(`this.name: `, this.name);
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




}

