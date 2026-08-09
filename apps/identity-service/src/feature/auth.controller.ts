import { Controller } from '@nestjs/common';

@Controller()
export class AuthCiontroller {
  auth(): string {
    return 'okk';
  }

  hello() {
    console.log('hello');
  }
}
