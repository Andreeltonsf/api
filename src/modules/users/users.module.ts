import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { UsersRepositories } from 'src/shared/database/repositories/users.repositories';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepositories, PrismaService],
})
export class UsersModule {}
