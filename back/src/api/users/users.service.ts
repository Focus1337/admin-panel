import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { randomUUID } from 'crypto';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/roles.entity';
import { UpdateUserDto } from '@/api/users/dto/update-user.dto';
import { Subscription } from '@/api/subs/subs.entity';
import { SubsService } from '@/api/subs/subs.service';
import { AuthHelper } from '@/api/users/auth/auth.helper';
import { ShowUserDto } from '@/api/users/dto/show-user.dto';
import { UserListDto } from '@/api/users/dto/user-list.dto';

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

  static modelToShowUserDto(user: User): ShowUserDto {
    const { id, name, lastName, email, roles }: User = user;
    return {
      id: id,
      name: name,
      lastName: lastName,
      email: email,
      roles: roles,
      password: '',
      confirmPassword: '',
    };
  }

  static modelToUserListDto(user: User): UserListDto {
    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      emailConfirmed: user.emailConfirmed,
      roles: user.roles,
      subName: user.sub.name,
      subDateStart: user.subDateStart,
    };
  }

  public async getAll(): Promise<UserListDto[]> {
    const users: User[] = await this.repository.find({
      relations: ['roles', 'sub'],
    });
    const returnDtoList: UserListDto[] = [];

    users.forEach((element) =>
      returnDtoList.push(UsersService.modelToUserListDto(element)),
    );

    return returnDtoList;
  }

  public async getUser(id: string): Promise<ShowUserDto> {
    const user: User = await this.repository.findOneOrFail(id, {
      relations: ['roles'],
    });

    return UsersService.modelToShowUserDto(user);
  }

  public async deleteUser(id: string): Promise<User> {
    const user: User = await this.repository.findOneOrFail(id);

    return this.repository.remove(user);
  }

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

    if (body.password != body.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const list: Role[] = [];
    for (const element of body.roles) {
      list.push(await this.rolesService.getRoleByName(element.name));
    }
    user.roles = list;

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

    if (body.password != body.confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    user.passwordHash = this.authHelper.encodePassword(body.password);

    user.sub = sub; // free sub
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
