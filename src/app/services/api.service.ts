import {Injectable} from '@angular/core';
import {Category} from './api.model';

@Injectable()
export class ApiService {
  public categories: Category[] = [
    {
      'categoryName': 'JavaScript',
      'questions': [
        {
          'questionText': '1. Jak zrobić, aby na kliknięcie labelki checkboxa, zaznaczał się dany checkbox?',
          'answers': [
            {'answerText': 'Wie co to jest', 'state': true},
            {'answerText': 'Potrafi wyjasnic', 'state': false},
            {'answerText': 'To zależy', 'state': true}
          ]
        },
        {
          'questionText': '2. Wyjaśnij czym są cookies?',
          'answers': [
            {'answerText': 'Wie co to jest', 'state': null},
            {'answerText': 'Potrafi wyjasnic', 'state': true},
            {'answerText': 'To zależy', 'state': false}
          ]
        },
        {
          'questionText': '3. Wyjaśnij czym są cookies?',
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
          'questionText': '4. Opisz czym jest kolejka zdarzeń / pętla zdarzeń (event loop)?',
          'answers': [
            {'answerText': 'Wie co to jest', 'state': false},
            {'answerText': 'Potrafi wyjasnic', 'state': null},
            {'answerText': 'To zależy', 'state': true}
          ]
        },
        {
          'questionText': '5. Opisz czym jest kolejka zdarzeń / pętla zdarzeń (event loop)?',
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
    const jsonData = this.categories.slice();
    return jsonData;
  }
}
