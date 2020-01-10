import { Module } from '@nestjs/common';
import { TodosController } from '../controllers/todos.controller';
import { TodosService } from '../services/todos.service';
import { PhotoService } from '../services/photo.service';
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
