export class SerializedQuestionnaire {
  public id: string;
  public name: string;
  public questionnaireData: SerializedCategory[];
}

export class SerializedCategory {
  public categoryName: string;
  public questions: SerializedQuestion[];
}

export class SerializedQuestion {
  public questionText: string;
  public answers: SerializedAnswer[];
  public answerInputs: AnswerInput[];
}

export class SerializedAnswer {
  public answerText: string;
  public state: boolean | null;
}

export class AnswerInput {
  public answerInputText: string;
  public state: boolean | null;
}
