import { AbstractEntity, IAbstractEntity } from 'src/common/abstract.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRoleEnum } from './enum/user-role.enum';

export interface IUserEntity extends IAbstractEntity {
  UserId: number;

  uuid: string;

  role: UserRoleEnum;

  deletedAt: Date;
}

@Entity()
export class Users extends AbstractEntity implements IUserEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  UserId: number;

  @Index()
  @Column('uuid')
  uuid: string;

  @Column('enum', { enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;

  @DeleteDateColumn()
  deletedAt: Date;
}
