import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { UserAggregate } from '../user.aggregate';

export class GetUserQuery {
  constructor(readonly UserId: number) {}
}

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery, Users> {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async execute(query: GetUserQuery): Promise<Users> {
    const qb = this.usersRepository.createQueryBuilder('user');
    const userAggregate = new UserAggregate(query.UserId);
    userAggregate.getUserQB(qb);
    const user = await qb.getOne();
    return user;
  }
}
