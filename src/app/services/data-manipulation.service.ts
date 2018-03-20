import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AnswerState} from '../models/answer-state';
import * as _ from 'lodash';
import {ApiService} from './api.service';
import {SerializedCategory} from '../models/api.model';
import {Question} from '../models/basic-interview.model';


@Injectable()
export class DataManipulationService {
  public filteredAnswers;

  constructor(private apiService: ApiService) {
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


  public getQuestionnaire(jsonData: SerializedCategory[]): Question[] {
    console.log(' o tu', jsonData);
    return jsonData.map(category => {
      const categoryData = {
        categoryName: category.categoryName,
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
      console.log(`categoryData`, categoryData);
      return categoryData;
    });
  }

  public jsonStateToEnum(state: boolean | null): AnswerState {
    if (state === true) {
      return AnswerState.Correct;
    } else if (state === false) {
      return AnswerState.Incorrect;
    } else {
      return AnswerState.Unasked;
    }
  }

  public getData(): SerializedCategory[] {
    return this.apiService.categories.slice();
  }
}
