import {IsNotEmpty, IsNumber, IsOptional, IsString} from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public genre: string;

  @IsNumber()
  @IsNotEmpty()
  public subType: number;

  @IsString()
  @IsNotEmpty()
  public image: string;

  @IsNumber()
  @IsNotEmpty()
  public year: number;

  @IsNumber()
  @IsNotEmpty()
  public rating: number;

  @IsString()
  @IsOptional()
  public authorId: string;
}
