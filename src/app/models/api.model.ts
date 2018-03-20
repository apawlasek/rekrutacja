export class SerializedCategory {
  public categoryName: string;
  public questions: SerializedQuestion[];
}

export class SerializedQuestion {
  public questionText: string;
  public answers: SerializedAnswer[];
}

export class SerializedAnswer {
  public answerText: string;
  public state: boolean | null;
}
