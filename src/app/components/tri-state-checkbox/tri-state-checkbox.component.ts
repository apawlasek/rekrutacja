import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {AnswerState} from '../../models/answer-state';

@Component({
  selector: 'app-tri-state-checkbox',
  templateUrl: './tri-state-checkbox.component.html',
  styleUrls: ['./tri-state-checkbox.component.scss']
})
export class TriStateCheckboxComponent implements OnInit {
  @Input() public state: FormControl;

  public answerState = AnswerState;

  constructor() {
  }

  public ngOnInit() {
  }

  public setState(value: AnswerState) {
    this.state.setValue(value);
  }
}
