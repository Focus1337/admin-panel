import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './roles.entity';

@Injectable()
export class RolesService {
  @InjectRepository(Role)
  private readonly repository: Repository<Role>;

  public getAll(): Promise<Role[]> {
    return this.repository.find();
  }

  public getRoleById(id: string): Promise<Role> {
    return this.repository.findOneOrFail(id);
  }

  public getRoleByName(name: string): Promise<Role> {
    return this.repository.findOneOrFail({ name: name });
  }
}
