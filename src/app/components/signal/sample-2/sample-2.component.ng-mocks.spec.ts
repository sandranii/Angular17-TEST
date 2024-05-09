import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sample2Component } from './sample-2.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { findComponent } from '../../../spec-helpers/element.spec-helper';
import { MockComponent } from 'ng-mocks';
import { Sample1Component } from '../sample-1/sample-1.component';

describe('Sample2Component', () => {
  let component: Sample2Component;
  let fixture: ComponentFixture<Sample2Component>;
  let sample1: Sample1Component;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sample2Component, MockComponent(Sample1Component)],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Sample2Component);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    const sample1Element = fixture.debugElement.query(By.directive(Sample1Component));
    sample1 = sample1Element.componentInstance;
  });


  it('檢查子組件存在: renders an independent Sample1 Component', () => {
    expect(sample1).toBeTruthy();
  })

  it('檢查輸入 @Input: passes a start count', () => {
    console.log('sample1', sample1);
    console.log('sample1.testCount', sample1.testCount);
    expect(sample1.testCount).toBe(5);
  })
  
  it('監聽@Output: countChange', () => {
    spyOn(console, 'log');
    const count = 5;
    sample1.countChange.emit(count);
    expect(console.log).toHaveBeenCalledWith(
      'sample 2 handleCountChange:',
      count
    )
  })
});
