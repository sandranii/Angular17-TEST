import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { Component } from '@angular/core';
import { User } from '../../../../interfaces';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  @Component({
    imports: [UserListComponent],
    standalone: true,
    template: `<app-user-list [users]="users" />`,
  })
  class TestHost {
    users: User[] = [];
  }

  it(`應從輸入框渲染使用者`, () => {
    //設定測試資料
    const testUser = {
      id: 1,
      firstName: 'Test',
      lastName: 'Lastname',
      username: 'testname',
    };
    //創建測試組件實例
    const fixture = TestBed.createComponent(TestHost);

    //傳遞測試資料
    fixture.componentInstance.users = [testUser];
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('li'));

    expect(rows.length).toBe(1);
    expect(rows[0].nativeElement.innerText).toContain('Test Lastname');
  });

  it(`應在使用者列表更新後重新渲染`, () => {
    // 初始化測試資料
    const initialUsers = [
      { id: 1, firstName: 'Test', lastName: 'User', username: 'testuser' },
    ];

    // 創建測試組件實例
    const fixture = TestBed.createComponent(TestHost);
    const hostComponent = fixture.componentInstance;

    // 初始傳遞測試資料
    hostComponent.users = initialUsers;
    fixture.detectChanges(); // 觸發首次渲染

    // 檢查初始渲染結果
    let rows = fixture.debugElement.queryAll(By.css('li'));
    expect(rows.length).toBe(1, '初始渲染應有一個使用者');

    // 更新測試資料 - 添加一個新使用者
    const newUser = {
      id: 2,
      firstName: 'TestNew',
      lastName: 'User',
      username: 'testnewuser',
    };
    hostComponent.users = [...hostComponent.users, newUser];
    fixture.detectChanges(); // 觸發重新渲染

    // 檢查更新後的渲染結果
    rows = fixture.debugElement.queryAll(By.css('li'));
    expect(rows.length).toBe(2, '更新後應有兩個使用者');
    expect(rows[1].nativeElement.innerText).toContain(
      'TestNew User',
      '新添加的使用者應被正確渲染'
    );
  });
});

// fixture.debugElement 測試畫面上的元素
//https://blog.csdn.net/i042416/article/details/108908212