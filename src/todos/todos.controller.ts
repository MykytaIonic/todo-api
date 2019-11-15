import { UseInterceptors, UploadedFiles, Controller, Get, Post, Res, Delete, Body, Param, Put, Req, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Todos } from '../models/todo.model';
import { AuthGuard } from '@nestjs/passport';
import { MulterOptions } from '../multer-config';
import { PhotoService } from '.././photo/photo.service';
import { identifier } from '@babel/types';

@Controller('todos')
export class TodosController {
  constructor(
    private todosService: TodosService, 
    private photoService: PhotoService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getTodo(@Req() req) {
    const user_id = req.user.id;
    return this.todosService.getTodo(user_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
    async create(@Body() todoData): Promise<any> {
      return this.todosService.create(todoData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
    async update(@Param('id') id, @Body() todoData: Todos): Promise<any> {
        todoData.id = (id);
        console.log('Update #' + todoData.id)
        return this.todosService.update(todoData);
  }


  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
     async delete(@Param('id') id): Promise<any> {
       return await this.todosService.delete(id);
  }

  @Post('image/:id')
  @UseInterceptors(AnyFilesInterceptor(MulterOptions))
  async uploadFile(@UploadedFiles() files, @Param('id') id, @Req() req) {
    debugger;
    return await this.photoService.changeImage(id, files[0].filename);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('photo/:id')
  getPhoto(@Param('id') id: any) {
      const todoId = id;
      return this.photoService.getPhoto(todoId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('photo/delete/:id')
     async remove(@Param('id') id, @Body('name') photoName): Promise<any> {
       console.log(photoName);
      return await this.photoService.remove(id, photoName);
  }

}
