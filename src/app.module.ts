import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todos } from './models/todo.model';
import { User } from './models/user.model';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TodosModule,
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://Mykyta:pilot123@cluster0-ojubb.mongodb.net/todos',
      entities: [__dirname + '/**/*.model{.ts,.js}'],
      synchronize: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    }),
    TypeOrmModule.forFeature([Todos, User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
