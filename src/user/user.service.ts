import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
   constructor(
       @InjectRepository(User)
       private userRepository: Repository<User>,
   ) { }

   async findByEmail(email: string): Promise<User> {
       debugger;
       return await this.userRepository.findOne({
           where: {
               email: email,
           }
       });
   }

   async findById(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
    }

   async create(user: User): Promise<User> {
     console.log(user);
     return await this.userRepository.save(user);
   }
}
