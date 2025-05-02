import { Module } from '@nestjs/common';
import { UsersRepositories } from 'src/shared/database/repositories/users.repositories';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepositories],
})
export class UsersModule {}
