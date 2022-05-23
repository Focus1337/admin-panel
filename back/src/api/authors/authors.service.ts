import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './authors.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { randomUUID } from 'crypto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  @InjectRepository(Author)
  private readonly repository: Repository<Author>;

  public getAll(): Promise<Author[]> {
    return this.repository.find();
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
    const author: Author = await this.repository.findOne(id);

    author.fullName = body.fullName;
    author.image = body.image;
    author.description = body.description;

    return this.repository.save(author);
  }

  public createAuthor(body: CreateAuthorDto): Promise<Author> {
    const author: Author = new Author();

    author.id = randomUUID();
    author.fullName = body.fullName;
    author.image = body.image;
    author.description = body.description;

    return this.repository.save(author);
  }
}
