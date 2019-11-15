import { Injectable } from '@nestjs/common';
import { Todos } from '../models/todo.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Photo } from '../models/photo.model';

@Injectable()
export class TodosService {
  ObjectId = require('mongodb').ObjectID;
  
  constructor(
    @InjectRepository(Todos) private todosRepository: Repository<Todos>,
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) { }

  async getTodo(user_id): Promise<Todos[]> {
    return await this.todosRepository.find({
      where: {
        user_id: String(user_id)
      },
    });
  }

  async create(todoData): Promise<Todos> {
    const { photos, todo } = todoData;

    const todoSave = await this.todosRepository.save(todo);
    photos.forEach(x => {
      x.todoId = String(todoSave.id);
      x.id = this.ObjectId(x.id);
    });
    await this.photoRepository.save(photos);
    
    return todoSave;
  }

  async update(todo: Todos): Promise<UpdateResult> {
    return await this.todosRepository.update(todo.id, todo);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.todosRepository.delete(id);
  }

}
