import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async singIn(@Body() body: any, @Res() res: Response) {
    const user = await this.authService.findOne(body.email);
    const validatePassword = bcrypt.compareSync(body.password, user.password);
    console.log(validatePassword);
    if (!validatePassword) {
      res.json({ message: 'Invalid credentials' });
    } else {
      body.token = 'token';
      await this.authService.signIn(body);
      res.json({ message: 'User logged in successfully', token: body.token });
    }
  }
}
