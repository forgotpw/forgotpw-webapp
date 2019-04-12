import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretStoreSimpleFormComponent } from './secret-store-simple-form.component';

describe('SecretStoreSimpleFormComponent', () => {
  let component: SecretStoreSimpleFormComponent;
  let fixture: ComponentFixture<SecretStoreSimpleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretStoreSimpleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretStoreSimpleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
