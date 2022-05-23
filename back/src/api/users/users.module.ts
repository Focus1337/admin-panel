import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '@/api/users/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule, AuthModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
