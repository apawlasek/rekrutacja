import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public references;
  public idsFromReferences;

  constructor() {
  }

  public ngOnInit() {
    this.references = this.getReferences();
    this.idsFromReferences = this.getIdsFromReferences();
  }

  public getReferences(): any[] {
    const references = localStorage.getItem('references');
    if (typeof references === 'string') {
      try {
        return JSON.parse(references);
      } catch (error) {
        console.warn(error);
        return [];
      }
    } else {
      return [];
    }
  }

  public getIdsFromReferences() {
    return this.references.map((obj) => obj.id);
  }

  public onDelete(id) {
    localStorage.removeItem('questionnaireData_' + id);
    this.removeFromReference(id);
    console.log(event);
  }

  public removeFromReference(id) {
    const references = JSON.parse(localStorage.getItem('references'));
    const pos = references.map((person) =>  person.id).indexOf(id);
    references.splice(pos, 1);
    localStorage.setItem('references', JSON.stringify(references));
    console.log('references from localStorage: ', JSON.parse(localStorage.getItem('references')));
    this.references = this.getReferences();
  }
}
