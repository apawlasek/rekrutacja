import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public references;
  public idsFromReferences = [];

  constructor() {
  }

  public ngOnInit() {
    this.references = this.getReferences();
    console.log(this.references);
  }

  public getReferences(): any[] {
    return JSON.parse(localStorage.getItem('references'));

  }
}
