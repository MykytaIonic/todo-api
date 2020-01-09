import { Module } from '@nestjs/common';
import { UserService } from "../services/user.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.model';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    //TypeOrmModule.forFeature([User])
    DatabaseModule
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
