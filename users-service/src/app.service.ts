import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  private users = [];

  constructor(
    @Inject('REDIS_SERVICE') private readonly redisClient: ClientProxy,
  ) {}

  createUser(user: any) {
    // let's assume in real world, user will be stored in db
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);

    // emit message
    this.redisClient.emit({ cmd: 'user.created' }, newUser);

    return newUser;
  }
}
