import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordHintStoreFormComponent } from './password-hint-store-form.component';

describe('PasswordHintStoreFormComponent', () => {
  let component: PasswordHintStoreFormComponent;
  let fixture: ComponentFixture<PasswordHintStoreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordHintStoreFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordHintStoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
