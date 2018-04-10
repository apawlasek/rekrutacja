import {Component,  Input} from '@angular/core';
import {Options} from '../../models/options.model';

@Component({
  selector: 'app-basic-interview-result',
  templateUrl: './basic-interview-result.component.html',
  styleUrls: ['./basic-interview-result.component.scss']
})
export class BasicInterviewResultComponent {
  @Input() public data;
  @Input() public options: Options;
    public colors = {
    correct: 'forestgreen',
    incorrect: 'darkred',
    unasked: 'grey',
  };
}
