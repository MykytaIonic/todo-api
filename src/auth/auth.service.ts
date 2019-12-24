import { Injectable } from '@nestjs/common';
import { UserService } from "../user/user.service";
import { User } from '.././models/user.model';
import * as crypto from 'crypto';
const jwt = require('jsonwebtoken');
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
  ) { }

  public async validate(userData: User): Promise<User> {
    return await this.userService.findByEmail(userData.email);
  }

  public async getUserById(id: string): Promise<User> {
    return await this.userService.findById(id);
  }

  public async login(user: User): Promise<any | { status: number }> {
    const userData = await this.validate(user);

    if (!userData) {
      console.log('The user does not exists');
      return { status: 404 };
    }

    user.password = crypto.createHmac('sha256', user.password).digest('hex');

    if (userData.password != user.password) {
      console.log('The password doesn\`t match.');
      return { status: 400 };
    }

    let payload = userData;
    const accessToken = jwt.sign(`${payload.id}`, 'secret123');

    return {
      expires_in: 3600,
      access_token: accessToken,
      user_id: payload.id,
      status: 200
    };
  }

  public async register(user: User): Promise<any> {
    const userData = await this.validate(user);

    if (userData) {
      console.log('The user already exists');
      return { status: 400 };
    }

    user.password = crypto.createHmac('sha256', user.password).digest('hex');
    const data = await this.userService.create(user);
    const accessToken = jwt.sign(`${data.id}`, 'secret123');

    return {
      expires_in: 3600,
      access_token: accessToken,
      user_id: data.id,
      status: 200
    };
  }

  public async registerSocial(user: User): Promise<any> {
    const userData = await this.validate(user);

    if (userData) {
      const accessToken = jwt.sign(`${userData.id}`, 'secret123');

      return {
        expires_in: 3600,
        access_token: accessToken,
        user_id: userData.id,
        status: 200
      };
    }
    const data = await this.userService.create(user);
    const accessToken = jwt.sign(`${data.id}`, 'secret123');

    return {
      expires_in: 3600,
      access_token: accessToken,
      user_id: data.id,
      status: 200
    };
  }
}
