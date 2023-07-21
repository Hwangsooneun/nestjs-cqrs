import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { SwaggerModule } from '@nestjs/swagger';
import { swagger_config } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'test1-client',
      },
    },
  });
  if (process.env.NODE_ENV !== 'production') {
    const document = SwaggerModule.createDocument(app, swagger_config);
    SwaggerModule.setup('OB-api', app, document);
  }
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
