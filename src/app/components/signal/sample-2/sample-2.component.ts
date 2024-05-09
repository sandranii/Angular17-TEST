import { Component } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { User } from '../../../interfaces';
import { Sample1Component } from '../sample-1/sample-1.component';

@Component({
  selector: 'app-sample-2',
  standalone: true,
  imports: [UserListComponent, Sample1Component],
  templateUrl: './sample-2.component.html',
  styleUrl: './sample-2.component.scss',
})
export class Sample2Component {
  users: User[] = [
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

  addUser() {
    this.users = [
      {
        id: 5,
        firstName: 'Andy',
        lastName: 'Bernard',
        username: 'andy.bernard',
      },
      ...this.users,
    ];
    // console.log('目前的Users：', this.users);
  }

  public handleCountChange(count: number) {
    console.log('sample 2 handleCountChange:', count);
  }
}
