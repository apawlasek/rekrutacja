import {Component} from '@angular/core';
import {CurrentStateService} from '../../services/current-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public currentStateService: CurrentStateService) {
  }

}
