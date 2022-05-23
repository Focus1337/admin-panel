import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAuthorDto {
  @IsString()
  @IsNotEmpty()
  public fullName: string;

  @IsString()
  @IsNotEmpty()
  public image: string;

  @IsString()
  @IsNotEmpty()
  public description: string;
}
