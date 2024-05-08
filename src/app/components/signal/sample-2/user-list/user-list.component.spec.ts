import { TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { Component } from '@angular/core';
import { User } from '../../../../interfaces';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  //父組件對子組件的資料傳遞
  @Component({
    imports: [UserListComponent],
    standalone: true,
    template: `<app-user-list [users]="users" [counter]="5"/>`,
  })
  class TestHost {
    users: User[] = [];
  }

  it(`應透過signal input渲染使用者`, () => {
    //設定測試資料
    const testUser = {
      id: 1,
      firstName: 'Test',
      lastName: 'Lastname',
      username: 'testname',
    };
    //創建測試組件實例
    const fixture = TestBed.createComponent(TestHost);

    // //舊寫法，但signal input 是read-only的 不能夠直接從子層賦值，一定要從父層傳進來
    // const fixture = TestBed.createComponent(UserListComponent);

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

  it('應當輸入框接收到輸入時調用updateQuery方法並傳遞正確的值', () => {
    const fixture = TestBed.createComponent(TestHost); // 使用TestHost組件
    fixture.detectChanges(); // 觸發變更檢測以應用初始的輸入值
  
    // 獲取UserListComponent實例
    const userListComponentInstance = fixture.debugElement.query(By.directive(UserListComponent)).componentInstance;
  
    // 在模擬輸入之前設置spy
    spyOn(userListComponentInstance, 'updateQuery').and.callThrough();
  
    // 模擬輸入事件
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = 'Test';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges(); // 觸發變更檢測以響應輸入事件
  
    // 檢查updateQuery方法是否被調用
    expect(userListComponentInstance.updateQuery).toHaveBeenCalled();
  });
  
});

// fixture.debugElement 測試畫面上的元素
//https://blog.csdn.net/i042416/article/details/108908212
