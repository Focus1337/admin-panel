import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { RolesModule } from '../roles/roles.module';
import { AuthModule } from '@/api/users/auth/auth.module';
import { SubsModule } from '@/api/subs/subs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    AuthModule,
    SubsModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
