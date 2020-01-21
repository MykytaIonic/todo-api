import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './models/todo.model';
import { User } from './models/user.model';
import { TodosModule } from './modules/todos.module';
import { AuthModule } from './modules/auth.module';
import { UserModule } from './modules/user.module';
import { Photo } from './models/photo.model';
import { PhotoModule } from './modules/photo.module';
import { AuthController } from './controllers/auth.controller';
import { TodosController } from './controllers/todos.controller';
import { UsersController } from './controllers/user.controller';
require('dotenv').config();

@Module({
  imports: [
    TodosModule,
    AuthModule,
    UserModule,
    PhotoModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DB_URI,
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),
    TypeOrmModule.forFeature([Todos, User, Photo]),
  ],
  controllers: [AuthController, TodosController, UsersController],
})
export class AppModule { }
