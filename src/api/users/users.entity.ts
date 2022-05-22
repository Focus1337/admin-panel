import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'AspNetUsers' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({ type: 'varchar', length: 256, name: 'Email' })
  public email: string;

  @Column({ type: 'text', name: 'Name' })
  public name: string;

  @Column({ type: 'text', name: 'LastName' })
  public lastName: string;

  // @Column({ type: 'boolean', default: false })
  // public isDeleted: boolean;

  /*
   * Create and Update Date Columns
   */

  // @CreateDateColumn({ type: 'timestamp' })
  // public createdAt!: Date;
  //
  // @UpdateDateColumn({ type: 'timestamp' })
  // public updatedAt!: Date;
}
