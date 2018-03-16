import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ApiService} from './api.service';
import {AnswerState} from '../models/answer-state';


@Injectable()
export class DisplayDataService {
  public tempData;

  constructor(private apiService: ApiService) {
    console.log('odpaliłem');
  }

  public displayQuestionnaire() {
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
