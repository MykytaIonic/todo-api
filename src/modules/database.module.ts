import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from '../entities/todo.entity';
import { UserEntity } from '../entities/user.entity';
import { PhotoEntity } from '../entities/photo.entity'
import { Todos } from '../models/todo.model';
import { User } from '../models/user.model';
import { Photo } from '../models/photo.model';

const entities = [
  TodoEntity,
  UserEntity,
  PhotoEntity
];

@Global()
@Module({
  imports:[
    TypeOrmModule.forRoot({
        type: 'mongodb',
        name: 'todos',
        url: 'mongodb+srv://Mykyta:pilot123@cluster0-ojubb.mongodb.net/todos',
        entities: [__dirname + '/**/*.model{.ts,.js}'],
        synchronize: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    }),
    TypeOrmModule.forFeature([Todos, User, Photo]),
  ],
  exports: [
    TypeOrmModule.forRoot({
      port: 3000,
      type: 'mongodb',
      name: 'todos',
      url: 'mongodb+srv://Mykyta:pilot123@cluster0-ojubb.mongodb.net/todos',
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),
    TypeOrmModule.forFeature([Todos, User, Photo]),
  ],
})
export class DatabaseModule {}