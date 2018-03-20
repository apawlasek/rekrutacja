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
  public type: 'checkbox';
}

export class AnswerInput {
public control: FormControl;
public type: 'input';
}


// export class SerializedCategory {
//   public categoryName: string;
//   public questions: SerializedQuestion[];
// }
//
// export class SerializedQuestion {
//   public questionText: string;
//   public answers: SerializedAnswer[];
// }
//
// export class SerializedAnswer {
//   public answerText: string;
//   public state: boolean | null;
// }
