import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalSampleSelectComponent } from './signal-sample-select.component';

describe('SignalSampleSelectComponent', () => {
  let component: SignalSampleSelectComponent;
  let fixture: ComponentFixture<SignalSampleSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalSampleSelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignalSampleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
