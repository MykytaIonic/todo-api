import { Module } from '@nestjs/common';
import { TodosController } from '../controllers/todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from '../services/todos.service';
import { Todos } from '../models/todo.model';
import { PhotoService } from '../services/photo.service';
import { Photo } from '../models/photo.model';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    //TypeOrmModule.forFeature([Todos, Photo]),
    DatabaseModule
  ],
  providers: [TodosService, PhotoService,],
  controllers: [TodosController],
  exports: [
    TodosService
  ]
})
export class TodosModule {}
