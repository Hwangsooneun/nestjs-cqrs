import { ApiProperty } from '@nestjs/swagger';
import { UserRoleEnum } from 'src/entities/enum/user-role.enum';
import { IUserEntity } from 'src/entities/users.entity';

export class CreateUserDto implements Partial<IUserEntity> {
  @ApiProperty({
    example: 1,
  })
  UserId: number;

  @ApiProperty({
    example: 'lksajldf290329-23',
  })
  uuid: string;

  @ApiProperty({
    example: UserRoleEnum.USER,
  })
  role?: UserRoleEnum;
}
