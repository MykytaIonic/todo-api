import { Module } from '@nestjs/common';
import { UserService } from "../services/user.service";
import { DatabaseModule } from './database.module';
import { UsersController } from '../controllers/user.controller';

@Module({
  imports: [
    //TypeOrmModule.forFeature([User])
    DatabaseModule
  ],
  providers: [UserService],
  controllers: [UsersController],
  exports: [UserService],
})
export class UserModule {}
