import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraedgeOnboardingComponent } from './intraedge-onboarding.component';

describe('IntraedgeOnboardingComponent', () => {
  let component: IntraedgeOnboardingComponent;
  let fixture: ComponentFixture<IntraedgeOnboardingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntraedgeOnboardingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntraedgeOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
