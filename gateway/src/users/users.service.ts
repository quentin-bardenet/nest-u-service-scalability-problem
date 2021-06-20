import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_SERVICE') private readonly clientUser: ClientProxy,
  ) {}

  createUser(user: any): any {
    const pattern = { cmd: 'user.create' };
    return this.clientUser.send(pattern, user);
  }
}
