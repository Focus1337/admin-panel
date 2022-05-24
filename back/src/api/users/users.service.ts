import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { randomUUID } from 'crypto';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.entity';
import { UpdateNameDto } from '@/api/users/dto/update-user.dto';
import { Request } from 'express';
import { Subscription } from '@/api/subs/subs.entity';
import { SubsService } from '@/api/subs/subs.service';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(RolesService)
  private readonly rolesService: RolesService;

  @Inject(SubsService)
  private readonly subsService: SubsService;

  public async getAll(): Promise<User[]> {
    return this.repository.find({ relations: ['roles', 'sub'] });
  }

  public getUser(id: string): Promise<User> {
    return this.repository.findOneOrFail(id, { relations: ['roles'] });
  }

  public async deleteUser(id: string): Promise<User> {
    const user: User = await this.repository.findOneOrFail(id);

    return this.repository.remove(user);
  }

  public async updateName(body: UpdateNameDto, req: Request): Promise<User> {
    const user: User = <User>req.user;

    user.name = body.name;

    return this.repository.save(user);
  }

  public async addUserRole(id: string, roleName: string): Promise<User> {
    const user: User = await this.repository.findOneOrFail(id, {
      relations: ['roles'],
    });

    if (user != null) {
      const role: Role = await this.rolesService.getRoleByName(roleName);

      if (!user.roles.includes(role)) user.roles.push(role);

      return this.repository.save(user);
    }
  }

  public async deleteUserRole(id: string, roleName: string): Promise<User> {
    const user: User = await this.repository.findOneOrFail(id, {
      relations: ['roles'],
    });

    if (user != null) {
      user.roles = user.roles.filter((r) => r.name != roleName);

      return this.repository.save(user);
    }
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const role: Role = await this.rolesService.getRoleByName('User');
    const sub: Subscription = await this.subsService.getSubById(4);
    const user: User = new User();

    user.id = randomUUID();
    user.name = body.name;
    user.lastName = body.lastName;
    user.email = body.email;
    user.passwordHash = body.password;
    user.sub = sub; // free sub
    user.subDateStart = new Date(Date.parse('0001-01-01 00:00:00'));
    user.image = ''; //new Buffer('','base64').toString();// 'https://i.imgur.com/DL9EEnF.png';
    user.roles = [role];

    user.userName = body.email;
    user.normalizedEmail = body.email.toUpperCase();
    user.normalizedUserName = body.email.toUpperCase();
    user.emailConfirmed = true;
    user.securityStamp = randomUUID();
    user.phoneNumberConfirmed = false;
    user.twoFactorEnabled = false;
    user.lockoutEnabled = true;
    user.accessFailedCount = 0;

    return this.repository.save(user);
  }
}
