import { Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Todos {

  @ObjectIdColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column()
  description: string;

  @Column()
  isDone: boolean;

  @Column()
  user_id: number;

  @Column()
  mongoId: number;

  @Column()
  position: string;
}
