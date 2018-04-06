import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public references;
  public idsFromReferences;
  public hideConfiramtionBtns = true;

  constructor(private apiService: ApiService) {
  }

  public ngOnInit() {
    this.references = this.apiService.getReferences();
    this.idsFromReferences = this.getIdsFromReferences();
  }

  public getIdsFromReferences() {

    return this.references.map((obj) => obj.id);
  }

  public onConfirm(e) {
    e.stopPropagation();
    e.preventDefault();
    this.hideConfiramtionBtns = !this.hideConfiramtionBtns;
  }
  public onDelete(id) {
    localStorage.removeItem('questionnaireData_' + id);
    this.removeFromReference(id);
  }

  public removeFromReference(id) {
    const references = JSON.parse(localStorage.getItem('references'));
    const pos = references.map((person) =>  person.id).indexOf(id);
    references.splice(pos, 1);
    localStorage.setItem('references', JSON.stringify(references));
    console.log('references from localStorage: ', JSON.parse(localStorage.getItem('references')));
    this.references = this.apiService.getReferences();
  }
}
