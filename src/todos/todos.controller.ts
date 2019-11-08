import { Controller, Get, Post, Res, Delete, Body, Param, Put, Req, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todos } from '../models/todo.model';
import { CreateTodoDto } from '../create-todo/create-todo.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getTodo(@Req() req) {
    const user = req.user;
    const user_id = req.user.id;
    return this.todosService.getTodo(user_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
    async create(@Body() todoData: Todos): Promise<any> {
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

}
