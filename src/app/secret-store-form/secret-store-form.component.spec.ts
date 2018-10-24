import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretStoreFormComponent } from './secret-store-form.component';

describe('SecretStoreFormComponent', () => {
  let component: SecretStoreFormComponent;
  let fixture: ComponentFixture<SecretStoreFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretStoreFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretStoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
