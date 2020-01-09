import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserModule } from './user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../common/environment';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../models/user.model';
import { AuthController } from '../controllers/auth.controller';
import { UserService } from "../services/user.service";
import { JwtStrategy } from '../common/jwt.strategy';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    //TypeOrmModule.forFeature([User]),
    DatabaseModule,
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
