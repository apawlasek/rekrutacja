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

  public filterAnswers(readyQuestions, states: AnswerState[]) {
    const categoryList = _.cloneDeep(readyQuestions);
    this.filteredAnswers = categoryList.filter((category) => {
      category.questionList = category.questionList.filter((question) => {
        question.answerList = question.answerList.filter((answer) => {
          return (_.includes(states, answer.control.value));
        });

        return question.answerList.length !== 0;
      });

      return category.questionList.length !== 0;

    });
    console.log('filtered answers ' + states, this.filteredAnswers);
    return this.filteredAnswers;

  }


  public getQuestionnaire(jsonData: SerializedCategory[]): Question[] {
     return jsonData.map(category => {
      const categoryData = {
        categoryName: category.categoryName,
        questionList: [],
      };

      categoryData.questionList = category.questions.map(question => {
        const questionData = {
          questionText: question.questionText,
          answerList: [],
          answerInputList: []
        };

        questionData.answerList = question.answers.map(answer => {
          return {
            answerText: answer.answerText,
            control: new FormControl(this.jsonStateToEnum(answer.state)),
            };
        });
        questionData.answerInputList = question.answerInputs.map( answerInput => {
            return {
              answerInputText: new FormControl(answerInput.answerInputText)
            };
        });
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
