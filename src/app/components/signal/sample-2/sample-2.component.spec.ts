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
      imports: [Sample2Component]
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
    it('檢查輸入: passes a start count', () => {
      const userList = findComponent(fixture, 'app-user-list');
      console.log('userList', userList);
      console.log('userList.properties', userList.properties);
      console.log("userList.properties['counter']", userList.properties['counter']);
      console.log("userList.properties['userList']", userList.properties['userList']);
      console.log("userList.properties['users']", userList.properties['users']);
      expect(userList.properties['counter']).toBe(5); //undefined
    })
  })

});
