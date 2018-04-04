import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadConfigurationComponent } from './load-configuration.component';

describe('LoadConfigurationComponent', () => {
  let component: LoadConfigurationComponent;
  let fixture: ComponentFixture<LoadConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
