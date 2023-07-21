import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { UserRoleEnum } from 'src/entities/enum/user-role.enum';
import { IUserEntity } from 'src/entities/users.entity';

export class GetUserRequestDto implements Partial<IUserEntity> {
  @ApiProperty({
    example: 1,
  })
  UserId: number;

  get description(): string {
    return `# 유저 불러오기
  - 요청 예시
    - GET /v1/users?UserId=1`;
  }
}

export class GetUserResponseDto implements Partial<IUserEntity> {
  @ApiResponseProperty({
    example: '23048fjakjdlf1-23',
  })
  uuid: string;

  @ApiResponseProperty({
    example: UserRoleEnum.USER,
  })
  role?: UserRoleEnum;
}
