import { Controller } from '@nestjs/common';

@Controller()
export class AuthCiontroller {
  auth(): string {
    return 'okk';
  }

  authFunction() {
    console.log('this is auth function');
  }
}
