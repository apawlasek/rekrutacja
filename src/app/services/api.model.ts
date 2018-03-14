export class Category {
  public categoryName: string;
  public questions: Question[];
}

export class Question {
  public questionText: string;
  public answers: Answer[];
}

export class Answer {
  public answerText: string;
  public state: boolean | null;
}
