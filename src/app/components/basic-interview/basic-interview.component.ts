import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FormControl} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {AnswerState} from '../../models/answer-state';

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

  constructor(private apiService: ApiService,
              private sanitizer: DomSanitizer) {
  }

  public ngOnInit() {
    const jsonData = this.apiService.getData();
    this.tempData = jsonData.map(category => {
      const categoryData = {
        name: category.categoryName,
        questionList: [],
      };

      categoryData.questionList = category.questions.map(question => {
        const questionData = {
          questionText: question.questionText,
          answerList: [],
        };

        questionData.answerList = question.answers.map(answer => {
          return {
            answerText: answer.answerText,
            control: new FormControl(this.jsonStateToEnum(answer.state))
          };
        });

        return questionData;
      });

      return categoryData;
    });
    // console.log(this.tempData);
    // console.log(JSON.stringify(this.tempData, null, 4));
    // this.serialize();
  }

  public checkStateForQuestion(question, state) {
    return question.answerList.some(answer => {
      console.log('answer.control.value: ', AnswerState.Correct);
      if (state === 'Correct'){
        return answer.control.value === AnswerState.Correct;
      } else if (state === 'Incorrect') {
        return answer.control.value === AnswerState.Incorrect;
      }

    });
  }

  public checkStateForCategory(category, state) {
    return category.questionList.some(question => this.checkStateForQuestion(question, state));
  }

  public serialize() {
    let output = `<h3> <p style="color:goldenrod">All answers: </p></h3>`;
    let trueAnswers = `<h3> <p style="color:green">All true answers: </p></h3>`;
    let falseAnswers = `<h3> <p style="color:darkred">All false answers: </p></h3>`;

    this.tempData.forEach(category => {
      output += `<div><h3><p style="color:dimgrey"> ${category.name}</p></h3></div>`;
      category.questionList.forEach((question) => {
        output += `<h4>${question.questionText}</h4>`;
        question.answerList.forEach(answer => {
          output += `<div><p style="text-indent: 10%; "><i>${answer.answerText}</i><strong> (${answer.control.value})</strong></p></div>`;
        });
      });

    });

    this.tempData.forEach(category => {
      if (this.checkStateForCategory(category, 'Correct')) {
        trueAnswers += `<div><h3><p style="color:dimgrey"> ${category.name}</p></h3></div>`;
        category.questionList.forEach((question) => {
          if (this.checkStateForQuestion(question, 'Correct')) {
            trueAnswers += `<h5>${question.questionText}</h5>`;
          }
          question.answerList.forEach(answer => {
            if (answer.control.value === AnswerState.Correct) {
              trueAnswers += `<div><p><i>${answer.answerText}</i></p></div>`;
            }
          });
        });
      }
    });

    this.tempData.forEach(category => {
      if (this.checkStateForCategory(category, 'Incorrect')) {
        falseAnswers += `<div><h3><p style="color:dimgrey"> ${category.name}</p></h3></div>`;
        category.questionList.forEach((question) => {
          if (this.checkStateForQuestion(question, 'Incorrect')) {
            falseAnswers += `<h5>${question.questionText}</h5>`;
          }
          question.answerList.forEach(answer => {
            if (answer.control.value === AnswerState.Incorrect) {
              falseAnswers += `<div><p><i>${answer.answerText}</i></p></div>`;
            }
          });
        });
      }
    });

    this.output = this.sanitizer.bypassSecurityTrustHtml(output);
    this.trueAnswers = this.sanitizer.bypassSecurityTrustHtml(trueAnswers);
    this.falseAnswers = this.sanitizer.bypassSecurityTrustHtml(falseAnswers);


  }

  public jsonStateToEnum(state: boolean | null): AnswerState {
    if (state === true) {
      return AnswerState.Correct;
    }
    if (state === false) {
      return AnswerState.Incorrect;
    }
    if (state === null) {
      return AnswerState.Unasked;
    }
  }

}

// trueAnswers += `<h5>${question.questionText}</h5>`
// <div><p><i>${answer.answerText}</i></p></div>
