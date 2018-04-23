import { Pipe, PipeTransform } from '@angular/core';
import {AnswerState} from '../models/answer-state';

@Pipe({
  name: 'translateAnswerState'
})
export class TranslateAnswerStatePipe implements PipeTransform {

  public transform(value: AnswerState): string {
    switch (value) {
      case AnswerState.RatherCorrect:
        return 'Raczej dobrze';
      case AnswerState.Correct:
        return 'Dobrze';
      case AnswerState.RatherIncorrect:
        return 'Raczej źle';
      case AnswerState.Incorrect:
        return 'Źle';
      case AnswerState.Unasked:
        return 'Niezadane';
      default:
        return '';
    }
  }

}
