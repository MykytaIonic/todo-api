import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: number;

  @Column({ length: 20 })
  email: string;

  @Column()
  password: string;
}
