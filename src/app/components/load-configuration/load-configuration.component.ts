import {Component, DoCheck, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-load-configuration',
  templateUrl: './load-configuration.component.html',
  styleUrls: ['./load-configuration.component.scss']
})
export class LoadConfigurationComponent implements OnInit, DoCheck {

  public questionsDB;
  public questionsDBMetaData;
  public  hideConfiramtionDBBtns = true;

  constructor(private apiService: ApiService) {}

  public ngOnInit() {
    this.loadMetaData();
  }
  public ngDoCheck() {
    this.loadMetaData();
  }

  public handleFileInput(files: FileList) {
    const file = files.item(0);
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.addEventListener('load', (ev: any) => {
      this.questionsDB  = JSON.parse(ev.target.result);
      this.apiService.updateQuestionsDB(this.questionsDB);
      console.log('data', this.questionsDB);
    });
  }

  public loadMetaData() {
    this.questionsDBMetaData = this.apiService.getQuestionsDBMetaData();
  }

  public onRemoveDB(e) {
    e.stopPropagation();
    e.preventDefault();
    this.apiService.removeDB();
  }

  public onConfirmDB() {
    this.hideConfiramtionDBBtns = !this.hideConfiramtionDBBtns;
  }
}
