import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/entities/users.entity';

const config: TypeOrmModuleAsyncOptions = {
  useFactory: async (config: ConfigService) => ({
    name: 'default',
    type: 'mysql',
    host: config.get('MYSQL_HOST'),
    port: +config.get('MYSQL_PORT'),
    username: config.get('MYSQL_USER'),
    password: config.get('MYSQL_PASSWORD'),
    database: config.get('MYSQL_DATABASE'),
    entities: [Users],
    migrations: [__dirname + '/src/migrations/*.ts'],
    cli: { migrationsDir: 'src/migrations' },
    autoLoadEntities: true,
    charset: 'utf8mb4',
    synchronize: true,
    // logging: true,
    keepConnectionAlive: true,
    dateStrings: true,
  }),
  inject: [ConfigService],
};

export default config;
