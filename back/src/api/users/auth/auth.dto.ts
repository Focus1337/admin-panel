import { Trim } from 'class-sanitizer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @Trim()
  @IsEmail()
  public email: string;

  @IsString()
  @MinLength(8)
  public password: string;
}

export class LoginDto {
  @Trim()
  @IsEmail()
  public readonly username: string;

  @IsString()
  public readonly password: string;
}
