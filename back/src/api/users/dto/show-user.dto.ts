import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '@/api/roles/roles.entity';

export class ShowUserDto {
  @IsString()
  public id: string;

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
  public password?: string;

  @IsString()
  @IsOptional()
  public confirmPassword?: string;

  @IsArray()
  public roles: Role[];
}
