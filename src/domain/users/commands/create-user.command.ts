import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEnum } from 'src/entities/enum/user-role.enum';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

export class CreateUserCommand {
  constructor(
    readonly UserId: number,
    readonly uuid: string,
    readonly role: UserRoleEnum,
  ) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserHandler
  implements ICommandHandler<CreateUserCommand, void>
{
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async execute(command: CreateUserCommand): Promise<void> {
    const user = new Users();
    user.UserId = command.UserId;
    user.role = command.role;
    user.uuid = command.uuid;
    await this.usersRepository.save(user);
  }
}
