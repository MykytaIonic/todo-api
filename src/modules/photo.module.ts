import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from '../services/photo.service';
import { Photo } from '../models/photo.model';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
   // TypeOrmModule.forFeature([Photo]),
   DatabaseModule
  ],
  providers: [PhotoService],
  exports: [
    PhotoService
  ]
})
export class PhotoModule {}
