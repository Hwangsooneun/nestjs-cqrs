import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ProvidersModule } from 'src/providers/providers.module';
import { CreateUserHandler } from './commands/create-user.command';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';

@Module({
  imports: [CqrsModule, ProvidersModule, TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [CreateUserHandler],
})
export class UsersModule {}
