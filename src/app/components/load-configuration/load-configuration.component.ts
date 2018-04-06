import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-load-configuration',
  templateUrl: './load-configuration.component.html',
  styleUrls: ['./load-configuration.component.scss']
})
export class LoadConfigurationComponent implements OnInit {

  public data;

  constructor(private apiService: ApiService) {
  }

  public ngOnInit() {
  }

  public handleFileInput(files: FileList) {
    const file = files.item(0);
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.addEventListener('load', (ev: any) => {
      this.data  = JSON.parse(ev.target.result);
      this.apiService.updateQuestionDB(this.data);
      console.log('data', this.data);
    });


  }
}
