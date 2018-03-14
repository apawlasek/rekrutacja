import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-tri-state-checkbox',
  templateUrl: './tri-state-checkbox.component.html',
  styleUrls: ['./tri-state-checkbox.component.scss']
})
export class TriStateCheckboxComponent implements OnInit {
  @Input() public state: FormControl;

  constructor() {
  }

  public ngOnInit() {
  }

  public setState(value) {
    this.state.setValue(value);
  }
}
