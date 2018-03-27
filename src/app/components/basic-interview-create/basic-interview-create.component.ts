import {Component, OnInit, OnDestroy, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-basic-interview-create',
  templateUrl: './basic-interview-create.component.html',
  styleUrls: ['./basic-interview-create.component.scss']
})
export class BasicInterviewCreateComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private formNameSubscription: Subscription;
  @Output() public name;
  @Output() public id;

  public reference = {id: '', name: ''};

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit() {
    this.createForm();
    this.setId();
  }

  public ngOnDestroy(): void {
    this.formNameSubscription.unsubscribe();
    console.log('ondestroy reference', this.reference);
  }

  private createForm(): void {
    this.form = this.fb.group({
      name: '',
    });

    this.formNameSubscription = this.form.get('name').valueChanges.subscribe((value: string) => {
      this.reference.name = value;
      console.log('value of name: ', value);
    });
  }

  public setId() {
    this.reference.id = (+(new Date())).toString(32);
    this.id = this.reference.id;
  }

  public addToReference() {
    let ref = [];
    const refString = localStorage.getItem('references');
    if (typeof refString === 'string') {
      ref = JSON.parse(refString);
    }
    console.log(`ref`, ref);
    if (ref !== [] && ref.some(person => person.id === this.reference.id)) {
      console.log(`dupa`);

    } else {
      ref.push(this.reference);
      console.log('spushowany ref: ', ref);
      localStorage.setItem('references', JSON.stringify(ref));
    }
  }

}
