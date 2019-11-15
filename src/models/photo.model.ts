import { Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Photo {

  @ObjectIdColumn()
  id?: string;

  @Column()
  todoId: string;

  @Column()
  name: string;

}