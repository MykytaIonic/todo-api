import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photo.service';
import { Photo } from '../models/photo.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
  ],
  providers: [PhotoService],
  exports: [
    PhotoService
  ]
})
export class PhotoModule {}
