import { Controller, Res, HttpStatus, Body, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService
  ) {}

  @Post('find')
    async findEmail(@Body() data, @Res() res): Promise<Object> {
        const email = data.email;
        const result = await this.userService.findByEmail(email);
        res.status(HttpStatus.OK).send(result);
        return result;
  }
}