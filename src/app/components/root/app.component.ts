import {Component, OnChanges, Output, OnInit} from '@angular/core';
import {DataManipulationService} from '../../services/data-manipulation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Output() public currentName;

  constructor(private dataManipulationService: DataManipulationService) {
  }
  public ngOnInit() {
    this.currentName = this.dataManipulationService.currentNameAndId.name;
  }
}
