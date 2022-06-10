import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './roles.entity';
import { JwtAuthGuard } from '@/api/users/auth/auth.guard';

@Controller('roles')
export class RolesController {
  @Inject(RolesService)
  private readonly service: RolesService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public getAll(): Promise<Role[]> {
    return this.service.getAll();
  }

  @Get('getRoleByName/:name')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public getRoleByName(@Param('name') name: string): Promise<Role> {
    return this.service.getRoleByName(name);
  }

  @Get('getRoleById/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public getRoleById(@Param('id', ParseUUIDPipe) id: string): Promise<Role> {
    return this.service.getRoleById(id);
  }
}
