import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// export class CreateUserDto {
//   readonly name: string;
//   readonly age: number;
// }

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public lastName: string;

  @IsEmail()
  public email: string;
}
