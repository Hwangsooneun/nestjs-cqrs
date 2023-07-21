import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserDto } from './dtos/create-user.dto';
import { ProvidersService } from 'src/providers/providers.service';
import { CreateUserCommand } from './commands/create-user.command';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUserRequestDto, GetUserResponseDto } from './dtos/get-user.dto';
import { GetUserQuery } from './queries/get-user.query';

@ApiTags('USERS')
@Controller('users')
export class UsersController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
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

  @ApiOperation({
    summary: '유저 불러오기',
    description: new GetUserRequestDto().description,
  })
  @ApiOkResponse({
    type: GetUserResponseDto,
  })
  @Get()
  async getUser(@Query() { UserId }: GetUserRequestDto) {
    return this.queryBus.execute(new GetUserQuery(UserId));
  }
}
