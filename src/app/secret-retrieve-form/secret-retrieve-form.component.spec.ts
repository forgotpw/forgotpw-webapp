import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretRetrieveFormComponent } from './secret-retrieve-form.component';

describe('SecretRetrieveFormComponent', () => {
  let component: SecretRetrieveFormComponent;
  let fixture: ComponentFixture<SecretRetrieveFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretRetrieveFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretRetrieveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
