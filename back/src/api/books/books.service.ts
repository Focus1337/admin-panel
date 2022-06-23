import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Author } from '../authors/authors.entity';
import { AuthorsService } from '../authors/authors.service';
import { ShowBookDto } from '@/api/books/dto/show-book.dto';

@Injectable()
export class BooksService {
  @InjectRepository(Book)
  private readonly repository: Repository<Book>;

  @Inject(AuthorsService)
  private readonly authorsService: AuthorsService;

  static modelToShowBookDto(book: Book): ShowBookDto {
    return {
      id: book.id,
      title: book.title,
      description: book.description,
      genre: book.genre,
      subType: book.subType,
      image: book.image,
      year: book.year,
      rating: book.rating,
      authorId: book.author.id,
    };
  }

  public getAll(): Promise<Book[]> {
    return this.repository.find({ relations: ['author'] });
  }

  public async getBook(id: string): Promise<ShowBookDto> {
    const book: Book = await this.repository.findOneOrFail(id, {
      relations: ['author'],
    });

    return BooksService.modelToShowBookDto(book);
  }

  public async deleteBook(id: string): Promise<Book> {
    const book: Book = await this.repository.findOne(id);

    return this.repository.remove(book);
  }

  public async updateBook(body: UpdateBookDto, id: string): Promise<Book> {
    const author: Author = await this.authorsService.getAuthor(body.authorId);
    const book: Book = await this.repository.findOne(id, {
      relations: ['author'],
    });

    book.title = body.title;
    book.description = body.description;
    book.genre = body.genre;
    book.subType = body.subType;
    book.image = body.image;
    book.year = body.year;
    book.rating = body.rating;
    if (body.authorId != null && body.authorId != '') {
      book.author = author;
    }

    return this.repository.save(book);
  }

  public async createBook(body: CreateBookDto): Promise<Book> {
    const author: Author = await this.authorsService.getAuthor(body.authorId);
    const book: Book = {
      id: randomUUID(),
      title: body.title,
      description: body.description,
      genre: body.genre,
      subType: body.subType,
      image: body.image,
      year: body.year,
      rating: body.rating,
      addedDate: new Date(Date.now()),
      author: author,
    };

    return this.repository.save(book);
  }
}
