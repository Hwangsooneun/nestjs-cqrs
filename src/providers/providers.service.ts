import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { CreateUserDto } from 'src/domain/users/dtos/create-user.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @Inject('ob_test_kafka')
    private readonly kafkaProducer: ClientKafka,
  ) {}

  public readonly KAFKA = {
    sendCreateUserMessage: async (user: CreateUserDto): Promise<void> => {
      await this.kafkaProducer.emit('create-user', user);
    },
  };
}
