import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signUp')
  singUp(@Body() body: any) {
    console.log(body);
    return this.authService.signUp(body);
  }
}
