import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { UserDto, UserSchema } from './schema/user.schema';
import { UserService } from './User.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body(new ZodValidationPipe(UserSchema)) user: UserDto) {
    return this.userService.Create(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.FindOne(id);
  }

  @Get()
  findAll() {
    return this.userService.FindAll();
  }
}
