import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import * as _ from 'lodash';

import {AnswerState} from '../../models/answer-state';

@Component({
  selector: 'app-tri-state-checkbox',
  templateUrl: './tri-state-checkbox.component.html',
  styleUrls: ['./tri-state-checkbox.component.scss']
})
export class TriStateCheckboxComponent implements OnInit {
  @Input() public state: FormControl;
  @Input() public excludedStates: AnswerState[];

  public answerState = AnswerState;

  private allowedStateList = [];

  constructor() {
  }

  public ngOnInit() {
    this.allowedStateList = _.difference([
      AnswerState.Unasked,
      AnswerState.RatherCorrect,
      AnswerState.Correct,
      AnswerState.Incorrect,
      AnswerState.RatherIncorrect,
    ], this.excludedStates);
  }

  public setState(targetState) {
    if (_.includes(this.allowedStateList, this.state.value)) {
      this.state.setValue(targetState);
    }
  }
}
