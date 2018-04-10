import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AnswerState} from '../../models/answer-state';
import {DataManipulationService} from '../../services/data-manipulation.service';
import {ActivatedRoute} from '@angular/router';
import {CurrentStateService} from '../../services/current-state.service';

@Component({
  selector: 'app-basic-interview-preview',
  templateUrl: './basic-interview-preview.component.html',
  styleUrls: ['./basic-interview-preview.component.scss']
})
export class BasicInterviewPreviewComponent implements OnInit, OnDestroy {
  public readyQuestions;
  public allAnswers;
  public trueAnswers;
  public falseAnswers;
  public activeTab = 'all';
  public categoriesObj = {};
  public id: string;
  public name: string;
  public summarizedAnswers = {};
  public references;
  public currentPersonReferenceObj;
  public answerState = AnswerState;
  public infoText;
  public zeroOpacity = true;


  constructor(private apiService: ApiService,
              private dataManipulationService: DataManipulationService,
              private route: ActivatedRoute,
              private currentStateService: CurrentStateService) {
  }

  public ngOnInit() {
    this.references = this.apiService.getReferences();
    this.getIdAndName();
    this.readyQuestions = this.apiService.loadData(this.id, this.name);
    this.categoriesObj = this.dataManipulationService.getCategoriesObj(this.readyQuestions);
    this.summarizedAnswers = this.dataManipulationService.summarizeAnswers((this.readyQuestions));
    this.serialize();
  }

  public ngOnDestroy() {
    this.currentStateService.setInterviewee('');
  }

  public getIdAndName() {
    this.id = this.route.snapshot.params['id'];
    this.currentPersonReferenceObj = this.references.find(obj => obj.id === this.id);
    this.name = this.currentPersonReferenceObj.name;
    setTimeout(() => {
      this.currentStateService.setInterviewee(this.name);
    });
  }

  public serialize() {
    this.allAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct, AnswerState.Incorrect]);
    this.trueAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct]);
    this.falseAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Incorrect]);
  }

  public setTabTo(tabName) {
    this.activeTab = tabName;
  }


  public onCollapse(category) {
    this.categoriesObj[category] = !this.categoriesObj[category];
  }

  public copy(id) {
    window.getSelection().selectAllChildren(document.getElementById(id));
    let copysuccess;
    try {
      copysuccess = document.execCommand('copy');
      window.getSelection().removeAllRanges();
      this.infoText = 'skopiowano!';
      this.zeroOpacity = false;
      setTimeout(() => {
        this.zeroOpacity = true;
      }, 3000);
    } catch (e) {
      copysuccess = false;
    }
    return copysuccess;
  }

}

