import {Injectable} from '@angular/core';
import {SerializedQuestionnaire} from '../models/api.model';
import * as _ from 'lodash';

@Injectable()
export class ApiService {
  private personalData: SerializedQuestionnaire = {
    id: '',
    name: '',
    questionnaireData: [
      {
        categoryName: 'JavaScript',
        questions: [
          {
            questionText: '1. Jak zrobić, aby na kliknięcie labelki checkboxa, zaznaczał się dany checkbox?',
            answers: [
              {answerText: 'Wie co to jest', 'state': null},
              {
                answerText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur illo minima non quaerat.',
                'state': null
              }
            ],
            answerInputs: [
              {answerInputText: ''}
            ]
          },
          {
            questionText: '2. Wyjaśnij czym są cookies?',
            answers: [
              {answerText: 'Wie co to jest', 'state': null},
              {answerText: 'Potrafi wyjasnic', 'state': null},
              {answerText: 'To zależy', 'state': null}
            ],
            answerInputs: [
              {answerInputText: ''}
            ]
          },
          {
            questionText: '3. Wyjaśnij czym są cookies?',
            answers: [
              {answerText: 'Wie co to jest', 'state': null},
              {answerText: 'Potrafi wyjasnic', 'state': null},
              {answerText: 'To zależy', 'state': null}
            ],
            answerInputs: [
              {answerInputText: ''}
            ]
          },
        ]
      },
      {
        categoryName: 'HTML',
        questions: [
          {
            questionText: '4. Opisz czym jest kolejka zdarzeń / pętla zdarzeń (event loop)?',
            answers: [
              {answerText: 'Wie co to jest', 'state': null},
              {answerText: 'Potrafi wyjasnic', 'state': null},
              {answerText: 'To zależy', 'state': null}
            ],
            answerInputs: [
              {answerInputText: ''}
            ]
          },
          {
            questionText: '5. Opisz czym jest kolejka zdarzeń / pętla zdarzeń (event loop)?',
            answers: [
              {answerText: 'Wie co to jest', 'state': null},
              {answerText: 'Potrafi wyjasnic', 'state': null},
              {answerText: 'To zależy', 'state': null}
            ],
            answerInputs: [
              {answerInputText: ''}
            ]
          }
        ]
      }
    ]
  };

  public getNewInterview(newId: string): SerializedQuestionnaire {
    const newData = _.cloneDeep(this.personalData);
    newData.id = newId;
    return newData;
  }
}
