import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

// @Injectable()
// export class UsersService {
//   private users = [];
//
//   getAll() {
//     return this.users;
//   }
//
//   getById(id: string) {
//     return this.users.find((p) => p.id == id);
//   }
//
//   create(userDto: CreateUserDto) {
//     const newUser = {
//       ...userDto,
//       id: Date.now().toString(),
//     };
//
//     this.users.push(newUser);
//
//     return newUser;
//   }
// }

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getAll() {
    return this.repository.find();
  }

  public getUser(id: number): Promise<User> {
    return this.repository.findOne(id);
  }

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();

    user.name = body.name;
    user.lastName = body.lastName;
    user.email = body.email;

    return this.repository.save(user);
  }
}
