import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Role } from '../roles/roles.entity';
import { Exclude } from 'class-transformer';
import { Subscription } from '@/api/subs/subs.entity';

export abstract class IdentityUser {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  public id: string;

  @Column({
    type: 'character varying',
    length: 256,
    name: 'Email',
    nullable: false,
  })
  public email: string;

  @Column({
    type: 'character varying',
    length: 256,
    name: 'NormalizedEmail',
    nullable: true,
  })
  public normalizedEmail: string;

  @Column({
    type: 'boolean',
    name: 'EmailConfirmed',
    default: false,
    nullable: false,
  })
  public emailConfirmed: boolean;

  @Exclude()
  @Column({ type: 'text', name: 'PasswordHash', nullable: false })
  public passwordHash: string;

  @Column({
    type: 'character varying',
    length: 256,
    name: 'UserName',
    nullable: true,
  })
  public userName: string;

  @Column({
    type: 'character varying',
    length: 256,
    name: 'NormalizedUserName',
    nullable: true,
  })
  public normalizedUserName: string;

  @Column({ type: 'text', name: 'SecurityStamp', nullable: true })
  public securityStamp: string;

  @Column({ type: 'text', name: 'ConcurrencyStamp', nullable: true })
  public concurrencyStamp: string;

  @Column({ type: 'text', name: 'PhoneNumber', nullable: true })
  public phoneNumber: string;

  @Column({
    type: 'boolean',
    name: 'PhoneNumberConfirmed',
    default: false,
    nullable: false,
  })
  public phoneNumberConfirmed: boolean;

  @Column({
    type: 'boolean',
    name: 'TwoFactorEnabled',
    default: false,
    nullable: true,
  })
  public twoFactorEnabled: boolean;

  @Column({
    type: 'boolean',
    name: 'LockoutEnabled',
    default: true,
    nullable: false,
  })
  public lockoutEnabled: boolean;

  @Column({
    type: 'integer',
    name: 'AccessFailedCount',
    default: 0,
    nullable: false,
  })
  public accessFailedCount: number;
}

@Entity({ name: 'AspNetUsers' })
export class User extends IdentityUser {
  @Column({ type: 'text', name: 'Name', nullable: false })
  public name: string;

  @Column({ type: 'text', name: 'LastName', nullable: false })
  public lastName: string;

  @Column({ type: 'text', name: 'Image', nullable: false })
  public image: string;

  @Column({
    type: 'timestamp without time zone',
    name: 'SubDateStart',
    nullable: false,
  })
  public subDateStart: Date;

  @ManyToOne(() => Subscription, (subscription) => subscription.users)
  @JoinColumn({ name: 'SubId' })
  public sub: Subscription;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'AspNetUserRoles',
    joinColumn: {
      name: 'UserId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'RoleId',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];
}
