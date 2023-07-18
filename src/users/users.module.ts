import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [
    CqrsModule,
    ClientsModule.register([
      {
        name: 'ob_test_kafka',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'ob_back',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'test1',
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
