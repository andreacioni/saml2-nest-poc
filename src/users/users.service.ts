import { Injectable } from '@nestjs/common';
import { User } from '../model/user';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
    {
      userId: 3,
      username: 'jackson',
      password: 'jackson',
    },
  ];

  async findOneByUsername(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.userId === id);
  }
}
