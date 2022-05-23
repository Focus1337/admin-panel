import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Author } from '../authors/authors.entity';

@Entity({ name: 'Books' })
export class Book {
  @PrimaryGeneratedColumn('uuid', { name: 'Id' })
  public id: string;

  @Column({ type: 'text', name: 'Title', nullable: false })
  public title: string;

  @Column({ type: 'text', name: 'Description', nullable: false })
  public description: string;

  @Column({ type: 'text', name: 'Genre', nullable: false })
  public genre: string;

  @Column({ type: 'integer', name: 'SubType', nullable: false })
  public subType: number;

  @Column({ type: 'text', name: 'Image', nullable: false })
  public image: string;

  @Column({ type: 'integer', name: 'Year', nullable: false })
  public year: number;

  @Column({ type: 'double precision', name: 'Rating', nullable: false })
  public rating: number;

  @Column({
    type: 'timestamp without time zone',
    name: 'AddedDate',
    nullable: false,
  })
  public addedDate: Date;

  @ManyToOne(() => Author, (author: Author) => author.books)
  @JoinColumn({ name: 'AuthorId' })
  public author: Author;
}
