import { Controller, Get, Res, Req, UseGuards, HttpStatus, Body, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from 'src/services/user.service';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UserService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
    async findEmail(@Body() data, @Res() res): Promise<any> {
        const email = data.email.toString();
        const result = await this.userService.findByEmail(email);
        res.status(HttpStatus.OK).send(result);
  }
}