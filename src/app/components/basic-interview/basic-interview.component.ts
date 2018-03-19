import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AnswerState} from '../../models/answer-state';
import {DisplayDataService} from '../../services/display-data.service';
import {DisplayOutputService} from '../../services/display-output.service';

@Component({
  selector: 'app-basic-interview',
  templateUrl: './basic-interview.component.html',
  styleUrls: ['./basic-interview.component.scss']
})
export class BasicInterviewComponent implements OnInit {
  public tempData;
  public allAnswers;
  public trueAnswers;
  public falseAnswers;
  public falseAnswers;
  public activeTab = 'all';

  constructor(private apiService: ApiService,
              private displayDataService: DisplayDataService,
              private displayOutputService: DisplayOutputService) {
  }

  public ngOnInit() {
    this.tempData = this.displayDataService.displayQuestionnaire(this.apiService.getData());
  }


  // public filterAnswers(answerTypeString, state: AnswerState) {
  //
  //   this.displayDataService.tempData.forEach(category => {
  //
  //     if (state === AnswerState.Any || this.checkStateForCategory(category, state)) {
  //       answerTypeString += `<div><h3><p style="color:dimgrey"> ${category.name}</p></h3></div>`;
  //       category.questionList.forEach((question) => {
  //         if (state === AnswerState.Any || this.checkStateForQuestion(question, state)) {
  //           answerTypeString += `<h5>${question.questionText}</h5>`;
  //           question.answerList.forEach(answer => {
  //             if (answer.type === 'checkbox') {
  //               if (state === AnswerState.Any || answer.control.value === state) {
  //                 answerTypeString += `<div><p style="text-indent: 5%; ">
  //                 <i>${answer.answerText}</i><strong> (${answer.control.value})</strong></p></div>`;
  //               }
  //             } else if (answer.type === 'input') {
  //               if (answer.control.value !== '') {
  //                 answerTypeString += `<div><p style="text-indent: 5%; ">${answer.control.value}</p></div>`;
  //
  //               }
  //             }
  //           });
  //         }
  //       });
  //     }
  //   });
  //
  //   return answerTypeString;
  // }

  // public filterAnswers(answerTypeString, state: AnswerState) {
  //   const categoryList = _.cloneDeep(this.displayDataService.tempData);
  //
  //   return categoryList.filter((category) => {
  //     category.questionList = category.questionList.filter((question) => {
  //       question.answerList = question.answerList.filter((answer) => {
  //         if (answer.type === 'checkbox' && (state === AnswerState.Any || answer.control.value === state)) {
  //           return true;
  //         } else if (answer.type === 'input' && answer.control.value !== '') {
  //           return true;
  //         }
  //         return false;
  //       });
  //
  //       return question.answerList.length !== 0;
  //     });
  //
  //     return category.questionList.length !== 0;
  //
  //   });
  // }

  public serialize() {
// all answers:
//     const allAnswers = this.filterAnswers(this.allAnswersHeader, AnswerState.Any);

    this.allAnswers = this.displayOutputService.filterAnswers(this.tempData, AnswerState.Any);
    this.trueAnswers = this.displayOutputService.filterAnswers(this.tempData, AnswerState.Correct);
    this.falseAnswers = this.displayOutputService.filterAnswers(this.tempData, AnswerState.Incorrect);

  }


  public setTabTo(tabName) {
    this.activeTab = tabName;
  }
}

