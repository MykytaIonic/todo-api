import { Injectable } from '@nestjs/common';
import { Todos } from '../models/todo.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Photo } from '../models/photo.model';

@Injectable()
export class TodosService {
  ObjectId = require('mongodb').ObjectID;
  public deleted = [];
  
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

    if (photos) {
    photos.forEach(x => {
      x.todoId = String(todoSave.id);
      x.id = this.ObjectId(x.id);
    });
    await this.photoRepository.save(photos);
  }
    return todoSave;
  }

  async update(todo: Todos): Promise<UpdateResult> {
    return await this.todosRepository.update(todo.id, todo);
  }

  async updateSqlite(todoData): Promise<UpdateResult> {
    let todo = todoData.updated;
    todo.forEach(a => {
      a.id = a.mongoId;
      a.id = this.ObjectId(a.id);
      console.log(typeof(a.mongoId));
    })
    return await this.todosRepository.save(todoData.updated);
  }

  async delete(id): Promise<DeleteResult> {
    const res = await this.todosRepository.delete(id);
        if (res) {
            const photos = await this.photoRepository.find({
                todoId: id,
            });
            photos.forEach(a => {
                const name = a.name;
                const fs = require('fs');
                const file = 'photos/';
                fs.unlink(file + name, function (err) {
                  if (err) throw err;
                  console.log('File deleted!');
                });
            });
            await this.photoRepository.remove(photos);
        }
        return res;
  }

  async deleteSqlite(todoData) {
    const { deleted } = todoData;
    return this.todosRepository.delete(deleted);
  }

}
