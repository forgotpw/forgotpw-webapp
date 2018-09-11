import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordHintRetrieveFormComponent } from './password-hint-retrieve-form.component';

describe('PasswordHintRetrieveFormComponent', () => {
  let component: PasswordHintRetrieveFormComponent;
  let fixture: ComponentFixture<PasswordHintRetrieveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordHintRetrieveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordHintRetrieveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
