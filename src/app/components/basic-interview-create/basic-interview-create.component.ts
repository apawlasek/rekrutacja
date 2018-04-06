import {AfterViewInit, Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {assertNumber} from '@angular/core/src/render3/assert';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-basic-interview-create',
  templateUrl: './basic-interview-create.component.html',
  styleUrls: ['./basic-interview-create.component.scss']
})
export class BasicInterviewCreateComponent implements OnInit, OnDestroy, AfterViewInit {
  public form: FormGroup;
  private formNameSubscription: Subscription;
  @Output() public name;
  @Output() public id;
  public disabled = true;

  @ViewChild('inputName') public inputName;

  public currentPersonReferenceObj = {id: '', name: '', creation: null, modification: null};

  constructor(private fb: FormBuilder,
              private router: Router,
              private apiService: ApiService) {
  }

  public ngOnInit() {
    this.createForm();
    this.setIdAndCreationDate();
  }

  public ngAfterViewInit() {
    this.inputName.nativeElement.focus();
  }

  public ngOnDestroy(): void {
    this.formNameSubscription.unsubscribe();
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: '',
    });

    this.formNameSubscription = this.form.get('name').valueChanges.subscribe((value: string) => {
      this.currentPersonReferenceObj.name = value;
      this.onDisabled();
    });
  }

  public setIdAndCreationDate() {
    this.currentPersonReferenceObj.id = (+(new Date())).toString(32);
    this.id = this.currentPersonReferenceObj.id;
    this.currentPersonReferenceObj.creation = Date.now();
    this.currentPersonReferenceObj.modification = Date.now();
  }

  // public addToReferences() {
  //   let ref = [];
  //   const refString = localStorage.getItem('references');
  //   if (typeof refString === 'string') {
  //     ref = JSON.parse(refString);
  //   }
  //   if (ref !== [] && ref.some(person => person.id === this.currentPersonReferenceObj.id)) {
  //     console.log(`dupa`);
  //
  //   } else {
  //     ref.push(this.currentPersonReferenceObj);
  //     localStorage.setItem('references', JSON.stringify(ref));
  //   }
  // }

  public onDisabled() {
    if (/^.*\s.*/.test(this.currentPersonReferenceObj.name)) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  public onEnter() {
    if (/^.*\s.*/.test(this.currentPersonReferenceObj.name)) {
      this.apiService.addToReferences(this.currentPersonReferenceObj);
      this.router.navigate(['/basic-interview', this.id]);
    }
  }
}


// (/^[a-zA-Z0-9]*\s[a-zA-Z0-9].*/.test(this.name))
