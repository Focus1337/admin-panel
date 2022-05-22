import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import { User } from './users.entity';
import {randomUUID} from "crypto";

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getAll(): Promise<User[]> {
    return this.repository.find();
  }

  public getUser(id: string): Promise<User> {
    return this.repository.findOne(id);
  }

  public async deleteUser(id: string): Promise<User> {
    const user: User = await this.repository.findOne(id);

    return this.repository.remove(user);
  }

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.id = randomUUID();
    user.name = body.name;
    user.lastName = body.lastName;
    user.email = body.email;
    user.passwordHash = body.password;
    user.subId = 4; // free sub
    user.subDateStart = new Date(Date.parse('0001-01-01 00:00:00'));
    user.image = '';//new Buffer('','base64').toString();// 'https://i.imgur.com/DL9EEnF.png';

    user.userName = body.email;
    user.normalizedEmail = body.email.toUpperCase();
    user.normalizedUserName = body.email.toUpperCase();
    user.emailConfirmed = true;
    user.securityStamp = randomUUID();
    // user.concurrencyStamp = ;
    user.phoneNumberConfirmed = false;
    user.twoFactorEnabled = false;
    user.lockoutEnabled = true;
    user.accessFailedCount = 0;

    return this.repository.save(user);
  }
}