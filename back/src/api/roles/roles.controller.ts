import { Controller, Get, Inject, Param, ParseUUIDPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './roles.entity';

@Controller('roles')
export class RolesController {
  @Inject(RolesService)
  private readonly service: RolesService;

  @Get()
  public getAll(): Promise<Role[]> {
    return this.service.getAll();
  }

  @Get('getRoleByName/:name')
  public getRoleByName(@Param('name') name: string): Promise<Role> {
    return this.service.getRoleByName(name);
  }

  @Get('getRoleById/:id')
  public getRoleById(@Param('id', ParseUUIDPipe) id: string): Promise<Role> {
    return this.service.getRoleById(id);
  }
}
