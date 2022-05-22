import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  Generated,
} from 'typeorm';

// export const PK_Authors = 'PK_Authors';

@Entity({ name: 'Authors' })
export class Author {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  public id: string;

  @Column({ type: 'text', name: 'FullName', nullable: false })
  public fullName: string;

  @Column({ type: 'text', name: 'Image', nullable: false })
  public image: string;

  @Column({ type: 'text', name: 'Description', nullable: false })
  public description: string;
}
