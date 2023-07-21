import { DocumentBuilder } from '@nestjs/swagger';

const swagger_config = new DocumentBuilder()
  .setTitle('orangedata-api')
  .setDescription('오랜지데이터 개발 API 문서입니다.')
  .setVersion('1.0')
  .setDescription(`sdf`)
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'accessToken',
      in: 'header',
    },
    'Authorization',
  )
  .build();

export { swagger_config };
