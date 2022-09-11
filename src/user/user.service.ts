import { Injectable } from '@nestjs/common';
import { User } from '../model/user';

@Injectable()
export class UserService {
  private _store: Map<string, User>;

  constructor() {
    this._store = new Map<string, User>();
  }

  storeUser(user: User): void {
    this._store.set(user.username, user);
  }

  retrieveUser(id: string): User | undefined {
    return this._store.get(id);
  }
}
