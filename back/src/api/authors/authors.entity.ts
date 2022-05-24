import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../books/books.entity';

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

  @OneToMany(() => Book, (book: Book) => book.author)
  public books: Book[];
}
