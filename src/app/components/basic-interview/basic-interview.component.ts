import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {DomSanitizer} from '@angular/platform-browser';
import {AnswerState} from '../../models/answer-state';
import {DisplayDataService} from '../../services/display-data.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-basic-interview',
  templateUrl: './basic-interview.component.html',
  styleUrls: ['./basic-interview.component.scss']
})
export class BasicInterviewComponent implements OnInit {
  public tempData;
  public output;
  public trueAnswers;
  public falseAnswers;
  public activeTab = 'all';
  public allAnswersHeader = `<h2> <p style="color:goldenrod">All answers: </p></h2>`;
  public falseAnswersHeader = `<h2> <p style="color:darkred">Incorrect answers: </p></h2>`;
  public trueAnswersHeader = `<h2> <p style="color:green">Correct answers: </p></h2>`;

  constructor(private apiService: ApiService,
              private sanitizer: DomSanitizer,
              private displayDataService: DisplayDataService) {
  }

  public ngOnInit() {
    this.displayDataService.displayQuestionnaire();
    this.tempData = this.displayDataService.tempData;
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

  public filterAnswers(answerTypeString, state: AnswerState) {
    const categoryList = _.cloneDeep(this.displayDataService.tempData);

    return categoryList.filter((category) => {
      category.questionList = category.questionList.filter((question) => {
        question.answerList = question.answerList.filter((answer) => {
          if (answer.type === 'checkbox' && (state === AnswerState.Any || answer.control.value === state)) {
            return true;
          } else if (answer.type === 'input' && answer.control.value !== '') {
            return true;
          }
          return false;
        });

        return question.answerList.length !== 0;
      });

      return category.questionList.length !== 0;
    });
  }

  public serialize() {
// all answers:
//     const allAnswers = this.filterAnswers(this.allAnswersHeader, AnswerState.Any);

// correct answers:
    const trueAnswers = this.filterAnswers(this.trueAnswersHeader, AnswerState.Correct);

// incorrect answers:
//     const falseAnswers = this.filterAnswers(this.falseAnswersHeader, AnswerState.Incorrect);

    // this.output = this.sanitizer.bypassSecurityTrustHtml(allAnswers);
    this.trueAnswers = this.sanitizer.bypassSecurityTrustHtml(trueAnswers);
    // this.falseAnswers = this.sanitizer.bypassSecurityTrustHtml(falseAnswers);
  }


  public setTabTo(tabName) {
    this.activeTab = tabName;
  }
}

