import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sample2Component } from './sample-2.component';
import { Component, DebugElement, EventEmitter, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { By } from '@angular/platform-browser';
import { findComponent } from '../../../spec-helpers/element.spec-helper';
import { Sample1Component } from '../sample-1/sample-1.component';

@Component({
  selector: 'app-sample-1',
  standalone: true,
  template: '<div></div>'  // 確保有一個簡單的模板
})
class FakeSample1Component implements Partial<Sample1Component> {
  @Input() public testCount = 0;
  @Output() public countChange = new EventEmitter<number>();
}

describe('Sample2Component (偽造一個子組件: FakeSample1Component)', () => {
  let component: Sample2Component;
  let fixture: ComponentFixture<Sample2Component>;
  let sample1: FakeSample1Component;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sample2Component,FakeSample1Component],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Sample2Component);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();

    const sample1Element = debugElement.query(By.directive(FakeSample1Component));
    console.log('sample1Element', sample1Element);
    sample1 = sample1Element.componentInstance;
  });
 
  // 檢查子組件存在
  xit('檢查子組件存在: renders an independent Sample1 Component', () => {
    expect(sample1).toBeTruthy();
  })

  //檢查輸入
  xit('檢查輸入 @Input: passes a start count', () => {
    console.log('sample1', sample1);
    console.log('sample1.testCount', sample1.testCount);
    expect(sample1.testCount).toBe(5); //undefined
  })

  xit('監聽@Output: countChange', () => {
    spyOn(console, 'log');
    const count = 5;
    sample1.countChange.emit(count);
    expect(console.log).toHaveBeenCalledWith(
      'sample 2 handleCountChange:',
      count
    )
  })

});
