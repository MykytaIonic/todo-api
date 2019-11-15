import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { Todos } from '../models/todo.model';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../models/photo.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todos, Photo]),
  ],
  providers: [TodosService, PhotoService,],
  controllers: [TodosController],
  exports: [
    TodosService
  ]
})
export class TodosModule {}
