import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import * as jwt from 'jsonwebtoken';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post()
  async singIn(@Body() body: any, @Res() res: Response) {
    const user = await this.authService.findOne(body.email);
    const validatePassword = bcrypt.compareSync(body.password, user.password);
    if (!validatePassword) {
      res.json({ message: 'Invalid credentials' });
    } else {
      const token = { email: user.email, id: user._id };
      body.token = 'token';
      console.log(process.env.JWT_SECRET);
      res.json({
        message: 'User logged in successfully',
        token: jwt.sign(token, process.env.JWT_SECRET),
      });
    }
  }
}
