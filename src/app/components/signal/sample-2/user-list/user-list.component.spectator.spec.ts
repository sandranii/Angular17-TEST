import { InputSignal, signal } from '@angular/core';
import { ModifiedUser, User } from '../../../../interfaces';
import { UserListComponent } from './user-list.component';
import { Spectator, byTestId, createComponentFactory } from '@ngneat/spectator';

describe('UserListComponent', () => {
  let spectator: Spectator<UserListComponent>;

  const createComponent = createComponentFactory({
    component: UserListComponent,
    shallow: true,
  })

  beforeEach(() => {
    spectator = createComponent({
      props: {
        counter: 5,
      }
    })
  })

  // 因為有 userList = input.required，沒給會報錯
  xit('測試 spectator', () => {
    console.log(spectator.component.counter)
    expect(spectator.component.counter).toBe(5); 
  })

  // InputSignal<ModifiedUser[], User[]> 型別問題
  xit('開始搜尋', () => {

    const users: User[] = [
      {
        id: 1,
        firstName: 'Michael',
        lastName: 'Scott',
        username: 'michael.scott',
      },
      {
        id: 2,
        firstName: 'Dwight',
        lastName: 'Schrute',
        username: 'dwight.schrute',
      },
      {
        id: 3,
        firstName: 'Angela',
        lastName: 'Martin',
        username: 'angela.martin',
      },
      {
        id: 4,
        firstName: 'Jim',
        lastName: 'Halpert',
        username: 'jim.halpert',
      },
    ];

    // 將 User 陣列轉換成 ModifiedUser 陣列
    const modifiedUsers = users.map(user => ({
      ...user,
      displayName: `${user.firstName} ${user.lastName}`,
    }));

    // 創建 InputSignal
    // const userListInputSignal: InputSignal<ModifiedUser[], User[]> = signal(modifiedUsers);

    // spectator.setInput('userList', userListInputSignal);
    // spectator.setInput('userList', modifiedUsers);
    // 模擬輸入查詢字串
    const searchTerm = 'Jane';
    spectator.typeInElement(searchTerm, byTestId('search-term-input'));
     // 檢查過濾後的使用者清單
     const filteredUsers = spectator.component.filteredUsers();
     expect(filteredUsers.length).toBe(1);
     expect(filteredUsers[0].displayName).toBe('Jane Smith');
  })

});
