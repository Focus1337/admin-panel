import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Redirect,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  // @Redirect('https://google.com', 301)
  getAll() {
    //: string {
    // return 'getAll';
    return this.userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): string {
    return 'getOne ' + id;
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto): string {
  //   return `name: ${createUserDto.name} Age: ${createUserDto.age}`;
  // }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return 'Removed ' + id;
  }

  @Put(':id')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): string {
    return `Updated ${id} name: ${updateUserDto.name} Age: ${updateUserDto.age}`;
  }
}
