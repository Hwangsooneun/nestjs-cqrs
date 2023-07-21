import { Module } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
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
            groupId: 'test1-client',
            allowAutoTopicCreation: true,
          },
        },
      },
    ]),
  ],
  providers: [ProvidersService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
