import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthHelper } from './auth.helper';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';
import { ConfigService } from '@nestjs/config';
import { User } from '@/api/users/users.entity';
import { RolesModule } from '@/api/roles/roles.module';
import { PassportModule } from '@nestjs/passport';
import { SubsModule } from '@/api/subs/subs.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', property: 'user' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_KEY'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES') },
      }),
    }),
    TypeOrmModule.forFeature([User]),
    RolesModule,
    SubsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, JwtStrategy],
  exports: [AuthHelper],
})
export class AuthModule {}
