import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sample2Component } from './sample-2.component';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { findComponent } from '../../../spec-helpers/element.spec-helper';

describe('Sample2Component', () => {
  let component: Sample2Component;
  let fixture: ComponentFixture<Sample2Component>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sample2Component],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Sample2Component);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('2. debugElement： add Andy Bernard', () => {
    // Act
    const addButton = debugElement.query(
      By.css('[data-testid="add-button"]')
    );
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges(); //手動觸發變更偵測
    // Assert
    const users = debugElement.query(
      By.css('[data-testid="users"]')
    );
    const firstListItem = users.nativeElement.querySelector('li');
    // console.log('users.nativeElement:', users.nativeElement);
    // console.log('firstListItem',firstListItem);
    expect(firstListItem.textContent).toBe('Andy Bernard');
    expect(firstListItem.innerText).toBe('Andy Bernard');
  });
 
  describe('independent UserList Component',() => {
    // 檢查子組件存在
    it('檢查子組件存在: renders an independent UserList Component', () => {
      const userList = findComponent(fixture, 'app-user-list');
      expect(userList).toBeTruthy();
    })
  
    //檢查輸入
    xit('檢查輸入: passes a start count', () => {
      const userList = findComponent(fixture, 'app-user-list');
      console.log('userList', userList);
      console.log('userList.properties', userList.properties);
      console.log("userList.properties['counter']", userList.properties['counter']);
      expect(userList.properties['counter']).toBe(5); //undefined
    })
  })

  describe('independent Sample1 Component',() => {
    // 檢查子組件存在
    it('檢查子組件存在: renders an independent Sample1 Component', () => {
      const sample1 = findComponent(fixture, 'app-sample-1');
      expect(sample1).toBeTruthy();
    })
  
    //檢查輸入
    xit('檢查輸入 @Input: passes a start count', () => {
      const sample1 = findComponent(fixture, 'app-sample-1');
      console.log('sample1', sample1);
      console.log('sample1.properties', sample1.properties);
      console.log("sample1.properties['testCount']", sample1.properties['testCount']);
      expect(sample1.properties['testCount']).toBe(5); //undefined
    })

    it('監聽@Output: countChange', () => {
      spyOn(console, 'log');
      const sample1 = findComponent(fixture, 'app-sample-1');
      const count = 5;
      sample1.triggerEventHandler('countChange', 5);
      expect(console.log).toHaveBeenCalledWith(
        'sample 2 handleCountChange:',
        count
      )
    })
  })
});
