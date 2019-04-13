import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretRetrieveSimpleFormComponent } from './secret-retrieve-simple-form.component';

describe('SecretRetrieveSimpleFormComponent', () => {
  let component: SecretRetrieveSimpleFormComponent;
  let fixture: ComponentFixture<SecretRetrieveSimpleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretRetrieveSimpleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretRetrieveSimpleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
