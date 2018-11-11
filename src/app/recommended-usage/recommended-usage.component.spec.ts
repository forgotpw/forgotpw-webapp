import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedUsageComponent } from './recommended-usage.component';

describe('RecommendedUsageComponent', () => {
  let component: RecommendedUsageComponent;
  let fixture: ComponentFixture<RecommendedUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
