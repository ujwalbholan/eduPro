import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get('/login')
  auth(): { message: string; status: string } {
    return { message: 'auth service', status: '200' };
  }
}
