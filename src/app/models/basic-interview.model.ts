import {FormControl} from '@angular/forms';

export class Questionnaire {
  public id: string;
  public name: string;
  public questionnaireData: Category[];
}

export class Category {
  public categoryName: string;
  public questionList: QuestionData[];
}

export class QuestionData {
  public questionText: string;
  public answerList: Answer[];
  public answerInputList: AnswerInput[];
}

export class Answer {
  public answerText: string;
  public control: FormControl;
}

export class AnswerInput {
  public answerInputText: FormControl;
  public control: FormControl;
}

