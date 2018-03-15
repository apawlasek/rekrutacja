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
  public activeTab = 'all';

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
            control: new FormControl(this.jsonStateToEnum(answer.state)),
            type: 'checkbox'
          };
        });
        const answerInput = {
          control: new FormControl(''),
          type: 'input'
        };
        questionData.answerList.push(answerInput);

        return questionData;
      });

      return categoryData;
    });
  }

  public checkStateForQuestion(question, state) {
    return question.answerList.some(answer => {
      if (state === 'Correct') {
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
    let output = `<h2> <p style="color:goldenrod">All answers: </p></h2>`;
    let trueAnswers = `<h2> <p style="color:green">All correct answers: </p></h2>`;
    let falseAnswers = `<h2> <p style="color:darkred">All incorrect answers: </p></h2>`;

    this.tempData.forEach(category => {
      output += `<div><h3><p style="color:dimgrey"> ${category.name}</p></h3></div>`;
      category.questionList.forEach((question) => {
        output += `<h4>${question.questionText}</h4>`;
        question.answerList.forEach(answer => {
          if (answer.type === 'checkbox') {
            output += `<div><p style="text-indent: 5%; "><i>${answer.answerText}</i><strong> (${answer.control.value})</strong></p></div>`;
          } else if (answer.type === 'input') {
            if (answer.control.value !== '') {
              output += `<div><p style="text-indent: 5%; ">${answer.control.value}</p></div>`;
            }
          }
        });
      });
    });

// correct answers:
    this.tempData.forEach(category => {
      if (this.checkStateForCategory(category, 'Correct')) {
        trueAnswers += `<div><h3><p style="color:dimgrey"> ${category.name}</p></h3></div>`;
        category.questionList.forEach((question) => {
          if (this.checkStateForQuestion(question, 'Correct')) {
            trueAnswers += `<h5>${question.questionText}</h5>`;
          }
          question.answerList.forEach(answer => {
            if (answer.control.value === AnswerState.Correct) {
              trueAnswers += `<div><p style="text-indent: 5%; "><i>${answer.answerText}</i></p></div>`;
            }
          });
        });
      }
    });

// incorrect answers:
    this.tempData.forEach(category => {
      if (this.checkStateForCategory(category, 'Incorrect')) {
        falseAnswers += `<div><h3><p style="color:dimgrey"> ${category.name}</p></h3></div>`;
        category.questionList.forEach((question) => {
          if (this.checkStateForQuestion(question, 'Incorrect')) {
            falseAnswers += `<h5>${question.questionText}</h5>`;
          }
          question.answerList.forEach(answer => {
            if (answer.control.value === AnswerState.Incorrect) {
              falseAnswers += `<div><p style="text-indent: 5%; "><i>${answer.answerText}</i></p></div>`;
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

  public setTabTo(tabName) {
    this.activeTab = tabName;
  }
}

