import {Component, DoCheck, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AnswerState} from '../../models/answer-state';
import {DataManipulationService} from '../../services/data-manipulation.service';
import {ActivatedRoute} from '@angular/router';
import {CurrentStateService} from '../../services/current-state.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-basic-interview',
  templateUrl: './basic-interview.component.html',
  styleUrls: ['./basic-interview.component.scss']
})
export class BasicInterviewComponent implements OnInit, OnDestroy, OnChanges {
  public readyQuestions;
  public allAnswers;
  public trueAnswers;
  public falseAnswers;
  public activeTab = 'all';
  public autosaveInterval;
  public resultTabsVisible = false;
  public categoriesObj = {};
  public id: string;
  public name: string;
  public summarizedAnswers = {};
  public form: FormGroup;
  public references;
  public currentPersonReferenceObj;
  public answerState = AnswerState;
  public infoText = '';

  constructor(private apiService: ApiService,
              private dataManipulationService: DataManipulationService,
              private route: ActivatedRoute,
              private currentStateService: CurrentStateService,
              private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.references = this.apiService.getReferences();
    this.getIdAndName();
    this.createForm();
    this.readyQuestions = this.apiService.loadData(this.id, this.name);
    this.categoriesObj = this.dataManipulationService.getCategoriesObj(this.readyQuestions);
    this.summarizedAnswers = this.dataManipulationService.summarizeAnswers((this.readyQuestions));
    this.autosaveInterval = setInterval(() => {
      this.autoSave();
    }, 10000);
  }

  public ngOnChanges() {
    this.infoText = '';
  }

  public ngOnDestroy() {
    clearInterval(this.autosaveInterval);
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

  private createForm(): void {
    this.form = this.fb.group({
      name: this.name,
    });
 }

  public onNameChange() {
    this.form.get('name').markAsPristine();
    this.name = this.form.get('name').value;
    console.log(`this.name `, this.name);
    this.readyQuestions.name = this.name;
    this.autoSave();
    this.currentStateService.setInterviewee(this.name);
    this.currentPersonReferenceObj.name = this.name;
    this.apiService.updateReferences(this.references);
  }

  public serialize() {
    this.allAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct, AnswerState.Incorrect]);
    this.trueAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Correct]);
    this.falseAnswers = this.dataManipulationService.filterAnswers(this.readyQuestions, [AnswerState.Incorrect]);
  }

  public autoSave() {
    const savedQuestions = this.dataManipulationService.saveQuestionnaire(this.readyQuestions);
    this.apiService.updateQuestionnaireData(savedQuestions);
    this.summarizedAnswers = this.dataManipulationService.summarizeAnswers((this.readyQuestions));
    this.serialize();
    this.infoText = 'zapisano!';
    setTimeout(() => {
      this.infoText = '';
    }, 3000);
  }

  public setTabTo(tabName) {
    this.activeTab = tabName;
  }

  public save() {
    this.autoSave();
    this.resultTabsVisible = true;
    this.currentPersonReferenceObj.modification = Date.now();
 this.apiService.updateReferences(this.references);
  }

  public onCollapse(category) {
    this.categoriesObj[category] = !this.categoriesObj[category];
  }


}
