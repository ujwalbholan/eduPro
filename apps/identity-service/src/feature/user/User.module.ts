import { Module } from '@nestjs/common';
import { UserService } from './User.service';
import { UserController } from './User.controller';

@Module({
  imports: [],
  providers: [UserService],
  exports: [UserModule],
  controllers: [UserController],
})
export class UserModule {}
