import {Injectable, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AnswerState} from '../models/answer-state';
import * as _ from 'lodash';

import {ApiService} from './api.service';
import {SerializedQuestionnaire} from '../models/api.model';
import {Questionnaire} from '../models/basic-interview.model';


@Injectable()
export class DataManipulationService {



  constructor(private apiService: ApiService) {
  }

  public filterAnswers(readyQuestions, states: AnswerState[]) {
    const categoryList = _.cloneDeep(readyQuestions).questionnaireData;
    return categoryList.filter((category) => {
      category.questionList = category.questionList.filter((question) => {
        question.answerList = question.answerList.filter((answer) => {
          return _.includes(states, answer.control.value);
        });

        return question.answerList.length !== 0;
      });

      return category.questionList.length !== 0;

    });


  }
  public summarizeAnswers(readyQuestions) {
    const categoryList = readyQuestions.questionnaireData;
    const answersSummary = {};
    categoryList.forEach(category => {
      answersSummary[category.categoryName] = {correct: 0, incorrect: 0, all: 0};
      category.questionList.forEach((question) => {
        question.answerList.forEach((answer) => {
          const abc = answersSummary[category.categoryName];
          abc.all++;
          if (answer.control.value === AnswerState.Correct) {
            abc.correct++;
          } else if (answer.control.value === AnswerState.Incorrect) {
            abc.incorrect++;
          }
        });
      });
    });

    // console.log(this.answersSummary);
    return answersSummary;
  }

  public loadQuestionnaire(serializedData: SerializedQuestionnaire): Questionnaire {
      const questionnaire = {
      id: serializedData.id,
      name: serializedData.name,
      questionnaireData: []
    };
    questionnaire.questionnaireData = serializedData.questionnaireData.map((category) => {
      const categoryData = {
        categoryName: category.categoryName,
        questionList: []
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
        questionData.answerInputList = question.answerInputs.map(answerInput => {
          return {
            answerInputText: new FormControl(answerInput.answerInputText),
            control: new FormControl(AnswerState.Unasked),

          };
        });
        return questionData;
      });
      return categoryData;
    });
    return questionnaire;
  }

  public saveQuestionnaire(questionnaire: Questionnaire): SerializedQuestionnaire {
    const serializedData = {
      id: questionnaire.id,
      name: questionnaire.name,
      questionnaireData: []
    };
    serializedData.questionnaireData = questionnaire.questionnaireData.map(category => {
      const categories = {
        categoryName: category.categoryName,
        questions: []
      };
      categories.questions = category.questionList.map((question) => {
        const questionData = {
          questionText: question.questionText,
          answers: [],
          answerInputs: []
        };
        questionData.answers = question.answerList.map((answer) => {
          return {
            answerText: answer.answerText,
            state: this.enumToJson(answer.control.value)
          };
        });
        questionData.answerInputs = question.answerInputList.map((answerInput) => {
          return {
            answerInputText: answerInput.answerInputText.value,
            state: this.enumToJson(answerInput.control.value),
          };
        });
        return questionData;
      });
      return categories;
    });
    return serializedData;
  }

  public getData(newId: string, newName: string): SerializedQuestionnaire {
    return this.apiService.getNewInterview(newId, newName);
  }

  private jsonStateToEnum(state: boolean | null): AnswerState {
    if (state === true) {
      return AnswerState.Correct;
    } else if (state === false) {
      return AnswerState.Incorrect;
    } else {
      return AnswerState.Unasked;
    }
  }

  private enumToJson(answerState: AnswerState) {
    if (answerState === AnswerState.Correct) {
      return true;
    } else if (answerState === AnswerState.Incorrect) {
      return false;
    } else {
      return null;
    }
  }
}

