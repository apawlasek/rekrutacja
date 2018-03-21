import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AnswerState} from '../../models/answer-state';
import {DataManipulationService} from '../../services/data-manipulation.service';
import {Question} from '../../models/basic-interview.model';

@Component({
  selector: 'app-basic-interview',
  templateUrl: './basic-interview.component.html',
  styleUrls: ['./basic-interview.component.scss']
})
export class BasicInterviewComponent implements OnInit {
  public readyQuestions: Question[];
  public allAnswers;
  public trueAnswers;
  public falseAnswers;
  public activeTab = 'all';

  constructor(private apiService: ApiService,
              private dataManipulationService: DataManipulationService) {
  }

  public ngOnInit() {
    this.readyQuestions = this.dataManipulationService.getQuestionnaire(this.dataManipulationService.getData());
    // setInterval(() => {
    //   this.serialize();
    // }, 60000);
  }

  public serialize() {

    this.allAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct, AnswerState.Incorrect]);
    this.trueAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct]);
    this.falseAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Incorrect]);

  }


  public setTabTo(tabName) {
    this.activeTab = tabName;
  }

  public save() {
    this.serialize();
  }
}

