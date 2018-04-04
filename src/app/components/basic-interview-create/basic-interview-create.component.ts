import {AfterViewInit, Component, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {assertNumber} from '@angular/core/src/render3/assert';

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

  public reference = {id: '', name: '', creation: null, modification: null};

  constructor(private fb: FormBuilder,
              private router: Router) {
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
      this.reference.name = value;
      this.onDisabled();
    });
  }

  public setIdAndCreationDate() {
    this.reference.id = (+(new Date())).toString(32);
    this.id = this.reference.id;
    this.reference.creation = Date.now();
    this.reference.modification = Date.now();
  }

  public addToReference() {
    let ref = [];
    const refString = localStorage.getItem('references');
    if (typeof refString === 'string') {
      ref = JSON.parse(refString);
    }
    if (ref !== [] && ref.some(person => person.id === this.reference.id)) {
      console.log(`dupa`);

    } else {
      ref.push(this.reference);
      localStorage.setItem('references', JSON.stringify(ref));
    }
  }

  public onDisabled() {
    if (/^.*\s.*/.test(this.reference.name)) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  public onEnter() {
    if (/^.*\s.*/.test(this.reference.name)) {
      this.addToReference();
      this.router.navigate(['/basic-interview', this.id]);
    }
  }
}


// (/^[a-zA-Z0-9]*\s[a-zA-Z0-9].*/.test(this.name))
