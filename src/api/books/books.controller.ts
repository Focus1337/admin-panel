import {Body, Controller, Delete, Get, Inject, Param, ParseUUIDPipe, Post, Put} from '@nestjs/common';
import {CreateBookDto} from "./dto/create-book.dto";
import {Book} from "./books.entity";
import {UpdateBookDto} from "./dto/update-book.dto";
import {BooksService} from "./books.service";


@Controller('books')
export class BooksController {
    @Inject(BooksService)
    private readonly service: BooksService;

    @Get()
    public getAll(): Promise<Book[]> {
        return this.service.getAll();
    }

    @Get(':id')
    public getBook(@Param('id', ParseUUIDPipe) id: string): Promise<Book> {
        return this.service.getBook(id);
    }

    @Delete(':id')
    public deleteBook(@Param('id', ParseUUIDPipe) id: string): Promise<Book> {
        return this.service.deleteBook(id);
    }

    @Put(':id')
    public updateBook(
        @Body() body: UpdateBookDto,
        @Param('id') id: string,
    ): Promise<Book> {
        return this.service.updateBook(body, id);
    }

    @Post()
    public createBook(@Body() body: CreateBookDto): Promise<Book> {
        return this.service.createBook(body);
    }
}