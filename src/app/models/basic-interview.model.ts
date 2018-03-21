import {FormControl} from '@angular/forms';

export class Question {
  public categoryName: string;
  public questionList: QuestionData[];
}

export class QuestionData {
  public questionText: string;
  public answerList: Answer[];
  public answerInput: AnswerInput;
}

export class Answer {
  public answerText: string;
  public control: FormControl;
}

export class AnswerInput {
public control: FormControl;
}

