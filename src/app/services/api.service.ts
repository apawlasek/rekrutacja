import {Injectable} from '@angular/core';
import {SerializedQuestionnaire} from '../models/api.model';
import * as _ from 'lodash';
import {DataManipulationService} from './data-manipulation.service';

@Injectable()
export class ApiService {

  constructor(private dataManipulationService: DataManipulationService) {
  }


  // private personalData: SerializedQuestionnaire = {
  //   id: '',
  //   name: '',
  //   questionnaireData: [
  //     {
  //       categoryName: 'JavaScript',
  //       questions: [
  //         {
  //           questionText: '1. Jak zrobić, aby na kliknięcie labelki checkboxa, zaznaczał się dany checkbox?',
  //           answers: [
  //             {answerText: 'Wie co to jest', 'state': null},
  //             {
  //               answerText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores aspernatur illo minima non quaerat.',
  //               'state': null
  //             }
  //           ],
  //           answerInputs: [
  //             {answerInputText: '', state: null}
  //           ]
  //         },
  //         {
  //           questionText: '2. Wyjaśnij czym są cookies?',
  //           answers: [
  //             {answerText: 'Wie co to jest', 'state': null},
  //             {answerText: 'Potrafi wyjasnic', 'state': null},
  //             {answerText: 'To zależy', 'state': null}
  //           ],
  //           answerInputs: [
  //             {answerInputText: '', state: null}
  //           ]
  //         },
  //         {
  //           questionText: '3. Wyjaśnij czym są cookies?',
  //           answers: [
  //             {answerText: 'Wie co to jest', 'state': null},
  //             {answerText: 'Potrafi wyjasnic', 'state': null},
  //             {answerText: 'To zależy', 'state': null}
  //           ],
  //           answerInputs: [
  //             {answerInputText: '', state: null}
  //           ]
  //         },
  //       ]
  //     },
  //     {
  //       categoryName: 'HTML',
  //       questions: [
  //         {
  //           questionText: '4. Opisz czym jest kolejka zdarzeń / pętla zdarzeń (event loop)?',
  //           answers: [
  //             {answerText: 'Wie co to jest', 'state': null},
  //             {answerText: 'Potrafi wyjasnic', 'state': null},
  //             {answerText: 'To zależy', 'state': null}
  //           ],
  //           answerInputs: [
  //             {answerInputText: '', state: null}
  //           ]
  //         },
  //         {
  //           questionText: '5. Opisz czym jest kolejka zdarzeń / pętla zdarzeń (event loop)?',
  //           answers: [
  //             {answerText: 'Wie co to jest', 'state': null},
  //             {answerText: 'Potrafi wyjasnic', 'state': null},
  //             {answerText: 'To zależy', 'state': null}
  //           ],
  //           answerInputs: [
  //             {answerInputText: '', state: null}
  //           ]
  //         }
  //       ]
  //     },
  //     {
  //       categoryName: 'Haft krzyżykowy',
  //       questions: [
  //         {
  //           questionText: '4. Opisz czym jest kolejka zdarzeń / pętla zdarzeń (event loop)?',
  //           answers: [
  //             {answerText: 'Wie co to jest', 'state': null},
  //             {answerText: 'Potrafi wyjasnic', 'state': null},
  //             {answerText: 'To zależy', 'state': null}
  //           ],
  //           answerInputs: [
  //             {answerInputText: '', state: null}
  //           ]
  //         },
  //         {
  //           questionText: '5. Opisz czym jest kolejka zdarzeń / pętla zdarzeń (event loop)?',
  //           answers: [
  //             {answerText: 'Wie co to jest', 'state': null},
  //             {answerText: 'Potrafi wyjasnic', 'state': null},
  //             {answerText: 'To zależy', 'state': null}
  //           ],
  //           answerInputs: [
  //             {answerInputText: '', state: null}
  //           ]
  //         }
  //       ]
  //     }
  //   ]
  // };

  public getNewInterview(newId: string, newName: string): SerializedQuestionnaire {
    const newData = _.cloneDeep(this.dataManipulationService.serializeQuestionsDB(this.getQuestionsDB()));
    newData.id = newId;
    newData.name = newName;
    return newData;
  }

  public loadData(id, name) {
    const questionnaireString = localStorage.getItem('questionnaireData_' + id);
    if (typeof  questionnaireString === 'string') {
      return this.dataManipulationService.loadQuestionnaire(JSON.parse(questionnaireString), id, name);
    } else {
      return this.dataManipulationService.loadQuestionnaire(this.getData(id, name), id, name);
    }
  }

  public getData(newId: string, newName: string): SerializedQuestionnaire {
    return this.getNewInterview(newId, newName);
  }


  public getReferences(): any[] {
    const references = localStorage.getItem('references');
    if (typeof references === 'string') {
      try {
        return JSON.parse(references);
      } catch (error) {
        console.warn(error);
        return [];
      }
    } else {
      return [];
    }
  }

  public getQuestionsDB() {
    const qDB = localStorage.getItem('qDataBase');
    if (typeof qDB === 'string') {
      try {
        return JSON.parse(qDB);
      } catch (error) {
        console.warn(error);
        return null;
      }
    } else {
      return null;
    }
  }

  public removeDB() {
    localStorage.removeItem('qDataBase');
  }

  public getQuestionsDBMetaData() {
    const data = this.getQuestionsDB();
    if (data) {
      return {
        date: data.date,
        comment: data.comment,
        amountOfQuestions: ''
      };
    } else {
      return null;
    }
  }


  public addToReferences(currentPersonReferenceObj) {
    const ref = this.getReferences();
    if (ref !== [] && ref.some(person => person.id === currentPersonReferenceObj.id)) {
      console.log(`dupa`);
    } else {
      ref.push(currentPersonReferenceObj);
      localStorage.setItem('references', JSON.stringify(ref));
    }
  }


  public updateReferences(references) {
    localStorage.setItem('references', JSON.stringify(references));

  }

  public updateQuestionnaireData(savedQuestions) {
    localStorage.setItem('questionnaireData_' + savedQuestions.id, JSON.stringify(savedQuestions));
    console.log('Questionnaire autosaved!');
  }

  public updateQuestionsDB(questionsDB) {
    localStorage.setItem('qDataBase', JSON.stringify(questionsDB));
  }
}
