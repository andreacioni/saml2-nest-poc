import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/model/user';
import { UsersService } from '../users/users.service';

@Injectable()
export class SamlSerializer extends PassportSerializer {
  constructor(private readonly userService: UsersService) {
    super();
  }
  serializeUser(user: User, done: (err: any, userId: number) => void) {
    done(null, user.userId);
  }

  async deserializeUser(userId: number, done: (err: any, user?: User) => void) {
    const user = await this.userService.findOneById(userId);
    if (user) {
      done(null, user);
    } else {
      done('failed to deserialize user');
    }
  }
}
