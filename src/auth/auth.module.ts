import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '.././models/user.model';
import { AuthController } from './auth/auth.controller';
import { UserService } from "../user/user.service";
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),

    JwtModule.register({
      secret: 'secret123',
      signOptions: { expiresIn: '60s' }
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],

})
export class AuthModule { }
