import { Injectable } from '@nestjs/common';
import { Todos } from '../models/todo.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class TodosService {
  constructor(
   @InjectRepository(Todos) private todosRepository: Repository<Todos>,
 ) {}

  async getTodo(user_id): Promise<Todos[]> {
    return await this.todosRepository.find({
      where: {
        user_id: String(user_id)
      },
      });
  }

  async create(todo: Todos): Promise<Todos> {
    return await this.todosRepository.save(todo);
  }

  async update(todo: Todos): Promise<UpdateResult> {
    return await this.todosRepository.update(todo.id, todo);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.todosRepository.delete(id);
  }

}
