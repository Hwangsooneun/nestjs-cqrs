import { Body, Controller, Post } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserDto } from './dtos/create-user.dto';
import { ProvidersService } from 'src/providers/providers.service';
import { CreateUserCommand } from './commands/create-user.command';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly providersService: ProvidersService,
  ) {}

  /** main 프로젝트에 유저 가입 이벤트가 일어남 */
  @ApiOperation({ summary: '유저 생성(main 프로젝트에서 생성된 유저)' })
  @Post()
  async createUser(@Body() body: CreateUserDto) {
    await this.providersService.KAFKA.sendCreateUserMessage(body);
  }

  @EventPattern('create-user')
  createUserSync(@Payload() value: CreateUserDto) {
    const { UserId, uuid, role } = value;
    return this.commandBus.execute<CreateUserCommand, void>(
      new CreateUserCommand(UserId, uuid, role),
    );
  }
}
