import { Injectable } from '@nestjs/common';
import { Photo } from '../models/photo.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ObjectID } from 'typeorm';
import { UpdateResult, DeleteResult } from  'typeorm';

@Injectable()
export class PhotoService {
  ObjectId = require('mongodb').ObjectID;
  constructor(
   @InjectRepository(Photo) private photoRepository: Repository<Photo>,
 ) {}

 async getPhoto(todoId): Promise<Photo[]> {
  return await this.photoRepository.find({
    where: {
      todoId: String(todoId)
    },
  });
}

async remove(id): Promise<DeleteResult> {
  return await this.photoRepository.delete(id);
}

 async changeImage(id: string, imageName: string){
    const photo = {
        todoId: id,
        name: imageName
    }

    return await this.photoRepository.save(photo);
}
  }