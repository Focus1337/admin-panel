import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Book } from '@/api/books/books.entity';

export class AuthorListDto {
  @IsString()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public fullName: string;

  @IsString()
  @IsNotEmpty()
  public image: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsArray()
  public books: Book[];
}
