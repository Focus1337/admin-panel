import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'AspNetRoles' })
export class Role {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  public id: string;

  @Column({
    type: 'character varying',
    length: 256,
    name: 'Name',
    nullable: true,
  })
  public name: string;

  @Column({
    type: 'character varying',
    length: 256,
    name: 'NormalizedName',
    nullable: true,
  })
  public normalizedName: string;

  @Column({ type: 'text', name: 'ConcurrencyStamp', nullable: true })
  public concurrencyStamp: string;
}
