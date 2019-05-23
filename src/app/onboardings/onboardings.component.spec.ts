import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardingsComponent } from './onboardings.component';

describe('OnboardingsComponent', () => {
  let component: OnboardingsComponent;
  let fixture: ComponentFixture<OnboardingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
