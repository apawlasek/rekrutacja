import {Component, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Output() public visibleBtn = false;

  public onVisibleBtn() {
    this.visibleBtn = !this.visibleBtn;
  }

}
