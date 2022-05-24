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
  Req,
  Header,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateNameDto, UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { JwtAuthGuard } from '@/api/users/auth/auth.guard';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  @Inject(UsersService)
  private readonly service: UsersService;

  @Get()
  @Header('X-Total-Count', '5')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  public getAll(): Promise<User[]> {
    return this.service.getAll();
  }

  @Get('getUser/:id')
  public getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.service.getUser(id);
  }

  @Delete('deleteUser/:id')
  public deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.service.deleteUser(id);
  }

  @Put('changeName')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  private updateName(
    @Body() body: UpdateNameDto,
    @Req() req: Request,
  ): Promise<User> {
    return this.service.updateName(body, req);
  }

  // @Put(':id')
  // public updateUser(
  //     @Body() body: UpdateUserDto,
  //     @Param('id') id: string,
  // ): Promise<User> {
  //   return this.service.updateUser(body, id);
  // }

  @Post('addUserRole/:id')
  public addUserRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('userRole') body: string,
  ): Promise<User> {
    return this.service.addUserRole(id, body);
  }

  @Post('deleteUserRole/:id')
  public deleteUserRole(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('userRole') body: string,
  ): Promise<User> {
    return this.service.deleteUserRole(id, body);
  }

  @Post('createUser')
  public createUser(@Body() body: CreateUserDto): Promise<User> {
    return this.service.createUser(body);
  }
}
