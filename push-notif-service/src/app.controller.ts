import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern({ cmd: 'user.created' })
  userCreatedEvent(user: any): any {
    console.log('Message received with data : ', user);
  }
}
