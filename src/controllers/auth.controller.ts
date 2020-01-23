import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { UserService } from "../services/user.service";
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UserService) { }

  @Post('login')
  async login(@Body() user: User, @Res() res): Promise<any> {
    try {
      const result = await this.authService.login(user);

      res.status(HttpStatus.CREATED).send({
        data: result,
      });

    } catch (e) {
      res.status(e.status).send({
        msg: e.message,
      });
    }
  }

  @Post('register')
  async register(@Body() user: User, @Res() res): Promise<any> {
    try {
    const result = await this.authService.register(user);

      res.status(HttpStatus.CREATED).send({
        data: result,
      });

    } catch (e) {
      res.status(e.status).send({
        msg: e.message,
      });
    }
  }

  @Post('registerSocial')
  async registerSocial(@Body() user: User, @Res() res): Promise<any> {
    const result = await this.authService.registerSocial(user);
    if (result.status === 200) {
      res.status(HttpStatus.CREATED).send({
        data: result,
      });
    }
    if (result.status === 400) {
      res.status(HttpStatus.FOUND).send({
        msg: 'The user already exists'
      });
    }
  }

}
