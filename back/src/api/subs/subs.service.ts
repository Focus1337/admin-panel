import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from '@/api/subs/subs.entity';

@Injectable()
export class SubsService {
  @InjectRepository(Subscription)
  private readonly repository: Repository<Subscription>;

  public getAll(): Promise<Subscription[]> {
    return this.repository.find();
  }

  public getSubById(id: number): Promise<Subscription> {
    return this.repository.findOneOrFail(id);
  }

  public getSubByName(name: string): Promise<Subscription> {
    return this.repository.findOneOrFail({ name: name });
  }
}
