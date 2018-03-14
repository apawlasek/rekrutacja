import {Injectable} from '@angular/core';
import {Category} from './api.model';

@Injectable()
export class ApiService {
  public categories: Category[] = [
    {
      'categoryName': 'JavaScript',
      'questions': [
        {
          'questionText': 'Jak zrobić, aby na kliknięcie labelki checkboxa, zaznaczał się dany checkbox?',
          'answers': [
            {'answerText': 'Wie co to jest', 'state': true},
            {'answerText': 'Potrafi wyjasnic', 'state': false},
            {'answerText': 'To zależy', 'state': true}
          ]
        },
        {
          'questionText': 'Wyjaśnij czym są cookies?',
          'answers': [
            {'answerText': 'Wie co to jest', 'state': true},
            {'answerText': 'Potrafi wyjasnic', 'state': true},
            {'answerText': 'To zależy', 'state': false}
          ]
        },
        {
          'questionText': 'Wyjaśnij czym są cookies?',
          'answers': [
            {'answerText': 'Wie co to jest', 'state': true},
            {'answerText': 'Potrafi wyjasnic', 'state': true},
            {'answerText': 'To zależy', 'state': false}
          ]
        },
      ]
    },
    {
      'categoryName': 'HTML',
      'questions': [
        {
          'questionText': 'Opisz czym jest kolejka zdarzeń / pętla zdarzeń (event loop)?',
          'answers': [
            {'answerText': 'Wie co to jest', 'state': false},
            {'answerText': 'Potrafi wyjasnic', 'state': false},
            {'answerText': 'To zależy', 'state': false}
          ]
        },
        {
          'questionText': 'Opisz czym jest kolejka zdarzeń / pętla zdarzeń (event loop)?',
          'answers': [
            {'answerText': 'Wie co to jest', 'state': false},
            {'answerText': 'Potrafi wyjasnic', 'state': false},
            {'answerText': 'To zależy', 'state': false}
          ]
        }
      ]
    }
  ];

  constructor() {
  }

  public getData() {
    return this.categories.slice();
  }
}
