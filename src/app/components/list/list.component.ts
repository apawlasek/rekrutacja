import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {DataManipulationService} from '../../services/data-manipulation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public references;
  public idsFromReferences;
  public confirmationBtnsSummary;

  constructor(private apiService: ApiService,
              private dataManipulationService: DataManipulationService) {
  }

  public ngOnInit() {
    this.references = this.apiService.getReferences().sort(function (a, b) {
      return b.modification - a.modification;
    });
    this.idsFromReferences = this.getIdsFromReferences();
    this.confirmationBtnsSummary = this.dataManipulationService.getConfirmationBtnsKeys(this.references);
  }

  public getIdsFromReferences() {

    return this.references.map((obj) => obj.id);
  }

  public onConfirm(e, id) {
    e.stopPropagation();
    e.preventDefault();
    this.dataManipulationService.showConfirmationBtns(this.confirmationBtnsSummary, id);
  }

  public onDelete(id) {
    localStorage.removeItem('questionnaireData_' + id);
    this.removeFromReference(id);
  }

  public removeFromReference(id) {
    const references = JSON.parse(localStorage.getItem('references'));
    const pos = references.map((person) => person.id).indexOf(id);
    references.splice(pos, 1);
    localStorage.setItem('references', JSON.stringify(references));
    console.log('references from localStorage: ', JSON.parse(localStorage.getItem('references')));
    this.references = this.apiService.getReferences();
  }
}
