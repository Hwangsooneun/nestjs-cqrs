import { AggregateRoot } from '@nestjs/cqrs';
import { Users } from 'src/entities/users.entity';
import { SelectQueryBuilder } from 'typeorm';

export class UserAggregate extends AggregateRoot {
  private readonly UserId: number;

  get getUserId(): number {
    return this.UserId;
  }

  constructor(UserId: number) {
    super();
    this.UserId = UserId;
  }

  public getUserQB(qb: SelectQueryBuilder<Users>): void {
    qb.select(['user.uuid', 'user.role']).where('user.UserId = :UserId', {
      UserId: this.getUserId,
    });
  }
}
