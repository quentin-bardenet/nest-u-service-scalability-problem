import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private users = [];

  constructor(
    @Inject('CLIENT_SERVICE') private readonly client: ClientProxy,
  ) {}

  createUser(user: any) {
    // let's assume in real world, user will be stored in db
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);

    // emit message
    this.client.emit({ cmd: 'user.created' }, newUser);

    return newUser;
  }
}
