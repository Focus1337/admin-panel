import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '@/api/users/users.entity';

@Entity({ name: 'Subs' })
export class Subscription {
  @PrimaryGeneratedColumn({ name: 'Id', type: 'integer' })
  public id: number;

  @Column({
    type: 'numeric',
    name: 'Price',
    nullable: false,
  })
  public price: number;

  @Column({
    type: 'text',
    name: 'Name',
    nullable: false,
  })
  public name: string;

  @Column({
    type: 'integer',
    name: 'Duration',
    nullable: false,
  })
  public duration: number;

  @Column({ type: 'text', name: 'Description', nullable: false })
  public description: string;

  @OneToMany(() => User, (user) => user.sub)
  public users: User[];
}
