import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Header,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { JwtAuthGuard } from '@/api/users/auth/auth.guard';

@Controller('users')
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;

  @Get()
  @Header('X-Total-Count', '5')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public getAll(): Promise<User[]> {
    return this.service.getAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.service.getUser(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.service.deleteUser(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public updateUser(
    @Body() body: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<User> {
    return this.service.updateUser(body, id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.createUser(body);
  }
}
