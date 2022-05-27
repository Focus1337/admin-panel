import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Author } from './authors.entity';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Controller('authors')
export class AuthorsController {
  @Inject(AuthorsService)
  private readonly service: AuthorsService;

  @Get()
  @Header('X-Total-Count', '5')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  public getAll(): Promise<Author[]> {
    return this.service.getAll();
  }

  @Get(':id')
  public getAuthor(@Param('id', ParseUUIDPipe) id: string): Promise<Author> {
    return this.service.getAuthor(id);
  }

  @Delete(':id')
  public deleteAuthor(@Param('id', ParseUUIDPipe) id: string): Promise<Author> {
    return this.service.deleteAuthor(id);
  }

  @Put(':id')
  public updateAuthor(
    @Body() body: UpdateAuthorDto,
    @Param('id') id: string,
  ): Promise<Author> {
    return this.service.updateAuthor(body, id);
  }

  @Post()
  public createAuthor(@Body() body: CreateAuthorDto): Promise<Author> {
    return this.service.createAuthor(body);
  }
}
