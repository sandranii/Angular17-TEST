import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sample1Component } from './sample-1.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { click, expectText, findEl } from '../../../spec-helpers/element.spec-helper';

describe('Sample1Component', () => {
  let component: Sample1Component;
  let fixture: ComponentFixture<Sample1Component>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sample1Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Sample1Component);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //toEqual: 用於比較物件或陣列的內容。它執行一個深度比較，檢查物件的所有屬性或陣列的所有元素是否相等。
  //toBe: 用於比較基本類型（如數字、字符串）或檢查兩個物件或陣列是否為同一個實例。它使用 === 比較運算符來進行測試。
  it('should reset count to 0', () => {
    component.reset();
    expect(component.count()).toBe(0);
  });

  it('should increase count by 1', () => {
    const initCount = component.count();
    component.increase();
    expect(component.count()).toBe(initCount + 1);
  });

  it('1-1. debugElement： should increase count by 1', () => {
    // Act
    const increaseButton = debugElement.query(
      By.css('[data-testid="increase-button"]')
    );
    increaseButton.triggerEventHandler('click', null);
    fixture.detectChanges(); //手動觸發變更偵測
    // Assert
    const count = debugElement.query(
      By.css('[data-testid="count"]')
    );
    expect(count.nativeElement.textContent).toBe('count: 1'); //DebugElement 沒有用於讀取文本內容的方法或屬性。需要訪問具有便利 textContent 屬性的原生DOM元素。
  });

  // 利用testing helpers 簡化重複程式碼
  it('1-2. [testing helpers] debugElement： should increase count by 1', () => {
    // Act
    click(fixture, 'increase-button');
    fixture.detectChanges(); //手動觸發變更偵測
    // Assert
    expectText(fixture, 'count', 'count: 1');
  });

  it('should double the count', () => {
    component.increase();
    expect(component.double()).toBe(2);
  });
});
