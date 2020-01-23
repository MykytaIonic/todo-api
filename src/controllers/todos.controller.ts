import { UseInterceptors, UploadedFiles, Controller, Get, Post, Res, Delete, Body, Param, Put, Req, UseGuards, HttpStatus } from '@nestjs/common';
import { TodosService } from '../services/todos.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Todos } from '../models/todo.model';
import { AuthGuard } from '@nestjs/passport';
import { MulterOptions } from '../common/middlewares/multer-config';
import { PhotoService } from '../services/photo.service';

@Controller('todos')
export class TodosController {
  constructor(
    private todosService: TodosService, 
    private photoService: PhotoService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getTodo(@Req() req, @Res() res) {
    const user_id = req.user.id;
    const result = await this.todosService.getTodo(user_id);
    if (result != null) {
      res.status(HttpStatus.OK).send(result);
    }
    if (user_id == null) {
      res.status(HttpStatus.NOT_FOUND).send({
        msg: 'Todos Not Found'
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
    async create(@Body() todoData, @Res() res): Promise<Object> {
      const result = await this.todosService.create(todoData);
      if (result != null) {
        res.status(HttpStatus.OK).send(result);
      }
      if (todoData == null) {
        res.status(HttpStatus.NOT_FOUND).send({
          msg: 'Bad Request'
        });
      }
      return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update/:id')
    async update(@Param('id') id, @Body() todoData: Todos, @Res() res): Promise<Object> {
        todoData.id = (id);
        const result = await this.todosService.update(todoData);
        if (result != null) {
          res.status(HttpStatus.OK).send(result);
        }
        if (todoData == null) {
          res.status(HttpStatus.NOT_FOUND).send({
            msg: 'Internal Error'
          });
        }
        console.log('Update #' + todoData.id);
        return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('update')
    async updateSqlite(@Body() todoData, @Res() res): Promise<Object> {
      const result = await this.todosService.updateSqlite(todoData);
      if (result != null) {
        res.status(HttpStatus.OK).send(result);
      }
      if (todoData == null) {
        res.status(HttpStatus.NOT_FOUND).send({
          msg: 'Bad Request'
        });
      }
      return result;
  }


  @UseGuards(AuthGuard('jwt'))
  @Delete('delete/:id')
     async delete(@Param('id') id, @Res() res): Promise<Object> {
       const result = await this.todosService.delete(id);
       if (result != null) {
        res.status(HttpStatus.OK).send(result);
      }
      if (id == null) {
        res.status(HttpStatus.NOT_FOUND).send({
          msg: 'Internal Error'
        });
      }
      return result;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('delete')
     async deleteSqlite(@Body() todoData, @Res() res): Promise<Object> {
       const result = await this.todosService.deleteSqlite(todoData);
       if (result != null) {
        res.status(HttpStatus.OK).send(result);
      }
      if (todoData == null) {
        res.status(HttpStatus.NOT_FOUND).send({
          msg: 'Bad Request'
        });
      }
      return result;
  }

  @Post('image/:id')
  @UseInterceptors(AnyFilesInterceptor(MulterOptions))
  async changeFile(@UploadedFiles() files, @Param('id') id, @Req() req, @Res() res) {
    const result = await this.photoService.changeImage(id, files[0].filename);
    if (result != null) {
      res.status(HttpStatus.OK).send(result);
    }
    if (id == null) {
      res.status(HttpStatus.NOT_FOUND).send({
        msg: 'Can not change image'
      });
    }
  }

  @Post('image')
  @UseInterceptors(AnyFilesInterceptor(MulterOptions))
  async uploadFile(@UploadedFiles() files, @Param('id') id, @Req() req, @Res() res) {
    const result = await this.photoService.changeImage(id, files[0].filename);
    if (result != null) {
      res.status(HttpStatus.OK).send(result);
    }
    if (id == null) {
      res.status(HttpStatus.NOT_FOUND).send({
        msg: 'Can not upload image'
      });
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('photo/:id')
  async getPhoto(@Param('id') id: any, @Res() res) {
      const todoId = id;
      const result = await this.photoService.getPhoto(todoId);
      if (result != null) {
        res.status(HttpStatus.OK).send(result);
      }
      if (todoId == null) {
        res.status(HttpStatus.NOT_FOUND).send({
          msg: 'Bad Request'
        });
      }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('photo/delete/:id')
     async remove(@Param('id') id, @Body('name') photoName, @Res() res): Promise<Object> {
       const result = await this.photoService.remove(id, photoName);
       if (result != null) {
        res.status(HttpStatus.OK).send(result);
      }
      if (id == null) {
        res.status(HttpStatus.NOT_FOUND).send({
          msg: 'Can not delete photo'
        });
      }
      return result;
  }

}
