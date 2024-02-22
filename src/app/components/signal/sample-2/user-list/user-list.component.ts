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
  }); // signal的input是 read-only的

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
