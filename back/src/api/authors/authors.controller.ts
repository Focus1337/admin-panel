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
import { Author } from './authors.entity';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { JwtAuthGuard } from '@/api/users/auth/auth.guard';

@Controller('authors')
export class AuthorsController {
  @Inject(AuthorsService)
  private readonly service: AuthorsService;

  @Get()
  @Header('X-Total-Count', '5')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public getAll(): Promise<Author[]> {
    return this.service.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public getAuthor(@Param('id', ParseUUIDPipe) id: string): Promise<Author> {
    return this.service.getAuthor(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public deleteAuthor(@Param('id', ParseUUIDPipe) id: string): Promise<Author> {
    return this.service.deleteAuthor(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public updateAuthor(
    @Body() body: UpdateAuthorDto,
    @Param('id') id: string,
  ): Promise<Author> {
    return this.service.updateAuthor(body, id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public createAuthor(@Body() body: CreateAuthorDto): Promise<Author> {
    return this.service.createAuthor(body);
  }
}
