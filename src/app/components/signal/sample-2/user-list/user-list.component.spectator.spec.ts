import { UserListComponent } from './user-list.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

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
  it('測試 spectator', () => {
    console.log(spectator.component.counter)
    expect(spectator.component.counter).toBe(5); 
  })

});
