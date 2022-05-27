import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '@/api/roles/roles.entity';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsOptional()
  public password: string;

  @IsString()
  @IsOptional()
  public confirmPassword: string;

  // public roles: Role[];
}

export class UpdateNameDto {
  @IsString()
  @IsOptional()
  public readonly name?: string;
}
