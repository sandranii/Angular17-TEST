import { Sample2Component } from './sample-2.component';
import { Spectator, byTestId, createComponentFactory } from '@ngneat/spectator';
import { UserListComponent } from './user-list/user-list.component';
import { Sample1Component } from '../sample-1/sample-1.component';
import { MockComponents } from 'ng-mocks';
import { User } from '../../../interfaces';

describe('Sample2Component with spectator', () => {
  let spectator: Spectator<Sample2Component>;

  let userList: UserListComponent | null;
  let sample1: Sample1Component | null;

  const createComponent = createComponentFactory({
    component: Sample2Component,
    shallow: true,
    declarations: [
      MockComponents(UserListComponent,Sample1Component)
    ]
  })

  beforeEach(() => {
    spectator = createComponent();

    userList = spectator.query(UserListComponent);
    sample1 = spectator.query(Sample1Component);

  })

  it('傳 users 到 userList 子組件', () => {
    console.log('userList?.userList',userList?.userList);
    console.log('spectator.component.users', spectator.component.users);
    expect(userList?.userList as any).toEqual(spectator.component.users);  // InputSignal 會有轉換型別問題，先用as any
  })

  it('點擊按鈕"Add Andy" 且 users 增加 Andy 的資料(加在第一組)', () => {
    let userAndy: User = {
      id: 5,
      firstName: 'Andy',
      lastName: 'Bernard',
      username: 'andy.bernard',
    };
    expect(userList?.userList.length).toBe(4); 
    spectator.click(byTestId('add-button')); // 點擊按鈕
    expect(userList?.userList.length).toBe(5);
    expect((userList?.userList as any)[0]).toEqual(userAndy);  // InputSignal 會有轉換型別問題，先用as any
  })

});
