import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Header,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './books.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import { BooksService } from './books.service';
import { JwtAuthGuard } from '@/api/users/auth/auth.guard';

@Controller('books')
export class BooksController {
  @Inject(BooksService)
  private readonly service: BooksService;

  @Get()
  @Header('X-Total-Count', '5')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public getAll(): Promise<Book[]> {
    return this.service.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public getBook(@Param('id', ParseUUIDPipe) id: string): Promise<Book> {
    return this.service.getBook(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public deleteBook(@Param('id', ParseUUIDPipe) id: string): Promise<Book> {
    return this.service.deleteBook(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public updateBook(
    @Body() body: UpdateBookDto,
    @Param('id') id: string,
  ): Promise<Book> {
    return this.service.updateBook(body, id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public createBook(@Body() body: CreateBookDto): Promise<Book> {
    return this.service.createBook(body);
  }
}
