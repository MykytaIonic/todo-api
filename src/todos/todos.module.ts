import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodosService } from './todos.service';
import { Todos } from '../models/todo.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Todos]),
  ],
  providers: [TodosService],
  controllers: [TodosController],
  exports: [
    TodosService
  ]
})
export class TodosModule {}
