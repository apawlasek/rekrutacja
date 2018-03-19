import {Component, Input, } from '@angular/core';

@Component({
  selector: 'app-basic-interview-result',
  templateUrl: './basic-interview-result.component.html',
  styleUrls: ['./basic-interview-result.component.scss']
})
export class BasicInterviewResultComponent {
  @Input() public data;
  @Input() public options;
  public colors = {
    Correct: 'forestgreen',
    Incorrect: 'darkred',
    Unasked: 'grey',
    Other: 'grey',
  };
}
