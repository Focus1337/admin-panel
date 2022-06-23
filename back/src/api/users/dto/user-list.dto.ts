import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Role } from '@/api/roles/roles.entity';

export class UserListDto {
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

  @IsBoolean()
  @IsNotEmpty()
  public emailConfirmed: boolean;

  @IsEmail()
  @IsNotEmpty()
  public subName: string;

  @IsDate()
  public subDateStart: Date;

  @IsArray()
  public roles: Role[];
}
