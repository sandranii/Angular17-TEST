import {
  Component,
  InputSignal,
  computed,
  effect,
  input,
  signal,
} from '@angular/core';
import { ModifiedUser, User } from '../../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  private query = signal('');

  userList = input.required<ModifiedUser[], User[]>({
    alias: 'users',
    transform: concatUserNames,
  }); // signal的input是 read-only的，只是目前在developer preview，還是有可能會改變

  // Required Input - does not have a initial value
  counter = input.required<number>();
  isEven = computed(()=> this.counter() % 2 === 0);

  // Optional Input property with undefined as initial value 
  counter1 = input<number>();
      
  // Optional Input property with initial value
  counter2 = input(0);
      

  constructor() {
    effect(() => {
      console.log('新的input值：', this.userList());

    });
  }

  filteredUsers = computed(() => {
    return this.userList().filter(({ displayName }) =>
      displayName.startsWith(this.query())
    );
  });

  updateQuery(e: Event) {
    this.query.set((e.target as HTMLInputElement).value);
  }
}

function concatUserNames(users: User[]): ModifiedUser[] {
  return users.map(({ firstName, lastName, ...user }) => ({
    ...user,
    displayName: `${firstName} ${lastName}`,
  }));
}
