import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './authors.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { randomUUID } from 'crypto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorListDto } from '@/api/authors/dto/author-list.dto';

@Injectable()
export class AuthorsService {
  @InjectRepository(Author)
  private readonly repository: Repository<Author>;

  static modelToAuthorListDto(author: Author): AuthorListDto {
    const { id, fullName, image, description, books }: Author = author;
    return {
      id: id,
      fullName: fullName,
      description: description,
      image: image,
      books: books,
    };
  }

  public async getAll(): Promise<AuthorListDto[]> {
    const authors: Author[] = await this.repository.find({
      relations: ['books'],
    });
    const returnDtoList: AuthorListDto[] = [];

    authors.forEach((element) =>
      returnDtoList.push(AuthorsService.modelToAuthorListDto(element)),
    );

    return returnDtoList;
  }

  public getAuthor(id: string): Promise<Author> {
    return this.repository.findOne(id);
  }

  public async deleteAuthor(id: string): Promise<Author> {
    const author: Author = await this.repository.findOne(id);

    return this.repository.remove(author);
  }

  public async updateAuthor(
    body: UpdateAuthorDto,
    id: string,
  ): Promise<Author> {
    const { fullName, image, description }: UpdateAuthorDto = body;
    const author: Author = await this.repository.findOne(id);

    author.fullName = fullName;
    author.image = image;
    author.description = description;

    return this.repository.save(author);
  }

  public createAuthor(body: CreateAuthorDto): Promise<Author> {
    const { fullName, image, description }: CreateAuthorDto = body;
    const author: Author = {
      id: randomUUID(),
      fullName: fullName,
      image: image,
      description: description,
      books: [],
    };

    return this.repository.save(author);
  }
}
