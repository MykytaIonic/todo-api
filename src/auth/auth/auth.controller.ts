import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../.././models/user.model';
import { UserService } from "../../user/user.service";
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UserService) { }

  @Post('login')
  async login(@Body() user: User, @Res() res): Promise<any> {
    const result = await this.authService.login(user);
    if (result.status === 200) {
      res.status(HttpStatus.CREATED).send({
        data: result,
      });
    }
    if (result.status === 404) {
      res.status(HttpStatus.NOT_FOUND).send({
        msg: 'The user does not exists'
      });
    }
    if (result.status === 400) {
      res.status(HttpStatus.NOT_FOUND).send({
        msg: 'The password doesn\`t match.'
      })
    }

  }

  @Post('register')
  async register(@Body() user: User, @Res() res): Promise<any> {
    const result = await this.authService.register(user);
    if (result.status === 200) {
      res.status(HttpStatus.CREATED).send({
        data: result,
      });
    }
    if (result.status === 400) {
      res.status(HttpStatus.NOT_FOUND).send({
        msg: 'The user already exists'
      });
    }
  }

  @Post('registerSocial')
  async registerSocial(@Body() user: User, @Res() res): Promise<any> {
    debugger;
    const result = await this.authService.registerSocial(user);
    if (result.status === 200) {
      debugger;
      res.status(HttpStatus.CREATED).send({
        data: result,
      });
    }
    if (result.status === 400) {
      res.status(HttpStatus.NOT_FOUND).send({
        msg: 'The user already exists'
      });
    }
  }

  /*@Post('loginSocial')
  async loginSocial(@Body() user: User, @Res() res): Promise<any> {
    const result = await this.authService.loginSocial(user);
    if (result.status === 200) {
      res.status(HttpStatus.CREATED).send({
        data: result,
      });
    }

  }*/

}
