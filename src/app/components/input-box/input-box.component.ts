import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.scss']
})
export class InputBoxComponent implements OnInit {
  @Input() public state;

  constructor() {
  }

  public ngOnInit() {
  }

}
