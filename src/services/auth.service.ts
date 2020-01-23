import { Injectable } from '@nestjs/common';
import { UserService } from "./user.service";
import { User } from '../models/user.model';
import { TokenEntity } from '../entities/token.entity';
import { ApplicationException } from '../common/exceptions/application.exception';
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

  public async login(user: User): Promise<TokenEntity | { status: number }> {
    const userData = await this.validate(user);

    if (!userData) {
      throw new ApplicationException(400, 'The user does not exists');
    }

    user.password = crypto.createHmac('sha256', user.password).digest('hex');

    if (userData.password != user.password) {
      throw new ApplicationException(400, 'The password doesn\`t match');
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

  public async register(user: User): Promise<TokenEntity> {
    const userData = await this.validate(user);

    if (userData) {
      throw new ApplicationException(400, "The user already exists");
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

  public async registerSocial(user: User): Promise<TokenEntity> {
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
