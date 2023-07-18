import { Body, Controller, Inject, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ClientKafka,
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('ob_test_kafka')
    private readonly kafkaProducer: ClientKafka,
    private readonly usersService: UsersService,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    await this.kafkaProducer.emit('create-user', body);
  }

  @MessagePattern('create-user')
  readMessage(@Payload() value: CreateUserDto, @Ctx() context: KafkaContext) {
    const originalMessage = context.getMessage();
    const response = originalMessage.value;

    console.log(value);
    console.log(originalMessage);
    console.log(`${new Date()}`);

    return response;
  }
}
