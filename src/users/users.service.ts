import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  public async getUsers() {
    return 'user';
  }
}