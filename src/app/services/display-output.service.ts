import {Injectable} from '@angular/core';
import {AnswerState} from '../models/answer-state';
import * as _ from 'lodash';

@Injectable()
export class DisplayOutputService {
  public filteredAnswers;


  constructor() {
  }

  public filterAnswers(tempData, state: AnswerState) {
    const categoryList = _.cloneDeep(tempData);

    this.filteredAnswers = categoryList.filter((category) => {
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
    console.log('filtered answers ' + state, this.filteredAnswers);
    return this.filteredAnswers;

  }


}

