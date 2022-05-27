import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';
import { User } from '@/api/users/users.entity';
import { randomUUID } from 'crypto';
import { Role } from '@/api/roles/roles.entity';
import { RolesService } from '@/api/roles/roles.service';
import { Subscription } from '@/api/subs/subs.entity';
import { SubsService } from '@/api/subs/subs.service';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  @Inject(RolesService)
  private readonly rolesService: RolesService;

  @Inject(SubsService)
  private readonly subsService: SubsService;

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { name, lastName, email, password }: RegisterDto = body;
    let user: User = await this.repository.findOne({ where: { email } });
    const roleUser: Role = await this.rolesService.getRoleByName('User');
    const roleAdmin: Role = await this.rolesService.getRoleByName('Admin');
    const sub: Subscription = await this.subsService.getSubById(4);

    if (user) {
      throw new HttpException('Conflict', HttpStatus.CONFLICT);
    }

    user = new User();

    user.id = randomUUID();
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.passwordHash = this.helper.encodePassword(password);
    user.sub = sub; // free sub
    user.subDateStart = new Date(Date.parse('0001-01-01 00:00:00'));
    user.image = ''; // 'https://i.imgur.com/DL9EEnF.png';
    user.roles = [roleUser, roleAdmin];

    user.userName = email;
    user.normalizedEmail = email.toUpperCase();
    user.normalizedUserName = email.toUpperCase();
    user.emailConfirmed = true;
    user.securityStamp = randomUUID();
    user.phoneNumberConfirmed = false;
    user.twoFactorEnabled = false;
    user.lockoutEnabled = true;
    user.accessFailedCount = 0;

    return this.repository.save(user);
  }

  public async login(body: LoginDto): Promise<string | never> {
    const user: User = await this.repository.findOne({
      where: { email: body.username },
      relations: ['roles'],
    });

    if (!user) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid: boolean = this.helper.isPasswordValid(
      body.password,
      user.passwordHash,
    );

    if (!user.roles.some((e) => e.name === 'Admin')) {
      throw new HttpException('User is not admin', HttpStatus.FORBIDDEN);
    }

    if (!isPasswordValid) {
      throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    }

    return JSON.stringify(this.helper.generateToken(user));
  }

  public async refresh(user: User): Promise<string> {
    return this.helper.generateToken(user);
  }
}
