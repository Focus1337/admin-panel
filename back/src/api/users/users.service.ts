import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { randomUUID } from 'crypto';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.entity';
import { UpdateNameDto, UpdateUserDto } from '@/api/users/dto/update-user.dto';
import { Request } from 'express';
import { Subscription } from '@/api/subs/subs.entity';
import { SubsService } from '@/api/subs/subs.service';
import { AuthHelper } from '@/api/users/auth/auth.helper';
import { Author } from '@/api/authors/authors.entity';
import { Book } from '@/api/books/books.entity';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(RolesService)
  private readonly rolesService: RolesService;

  @Inject(SubsService)
  private readonly subsService: SubsService;

  @Inject(AuthHelper)
  private readonly authHelper: AuthHelper;

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

  // public async addUserRole(id: string, roleName: string): Promise<User> {
  //   const user: User = await this.repository.findOneOrFail(id, {
  //     relations: ['roles'],
  //   });
  //
  //   if (user != null) {
  //     const role: Role = await this.rolesService.getRoleByName(roleName);
  //
  //     if (!user.roles.includes(role)) user.roles.push(role);
  //
  //     return this.repository.save(user);
  //   }
  // }
  //
  // public async deleteUserRole(id: string, roleName: string): Promise<User> {
  //   const user: User = await this.repository.findOneOrFail(id, {
  //     relations: ['roles'],
  //   });
  //
  //   if (user != null) {
  //     user.roles = user.roles.filter((r) => r.name != roleName);
  //
  //     return this.repository.save(user);
  //   }
  // }

  public async updateUser(body: UpdateUserDto, id: string): Promise<User> {
    const user: User = await this.repository.findOneOrFail(id, {
      relations: ['roles', 'sub'],
    });

    user.name = body.name;
    user.lastName = body.lastName;
    user.email = body.email;
    user.userName = body.email;
    user.normalizedEmail = body.email.toUpperCase();
    user.normalizedUserName = body.email.toUpperCase();
    if (
      body.password != null &&
      body.password != '' &&
      body.confirmPassword != null &&
      body.confirmPassword != '' &&
      body.password == body.confirmPassword
    ) {
      user.passwordHash = this.authHelper.encodePassword(body.password);
    }

    // const copy = [];
    //
    // body.roles.forEach(function (item) {
    //   copy.push(item);
    //   console.warn(item);
    // });

    // user.roles = [await this.rolesService.getRoleByName(body.roles.f.name)];
    // for (let i = 0; i < body.roles.length; i++) {
    //   user.roles.push(
    //     await this.rolesService.getRoleByName(body.roles[i].name),
    //   );
    // }

    return this.repository.save(user);
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const role: Role = await this.rolesService.getRoleByName('User');
    const sub: Subscription = await this.subsService.getSubById(4);
    const user: User = new User();

    user.id = randomUUID();
    user.name = body.name;
    user.lastName = body.lastName;
    user.email = body.email;

    if (body.password == body.confirmPassword) {
      user.passwordHash = this.authHelper.encodePassword(body.password);
    }

    user.sub = sub; // free sub
    // user.subId = 4; // free sub
    user.subDateStart = new Date(Date.parse('0001-01-01 00:00:00'));
    user.image = ''; // 'https://i.imgur.com/DL9EEnF.png';
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
