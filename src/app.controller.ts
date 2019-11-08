import { Controller, Get, Request, Post, UseGuards, Body, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { User } from './models/user.model';
import { UserService } from "./user/user.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
