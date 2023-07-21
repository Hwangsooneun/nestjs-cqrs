import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ProvidersModule } from 'src/providers/providers.module';
import { CreateUserHandler } from './commands/create-user.command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { GetUserHandler } from './queries/get-user.query';

@Module({
  imports: [CqrsModule, ProvidersModule, TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [CreateUserHandler, GetUserHandler],
})
export class UsersModule {}
