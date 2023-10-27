import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @HttpCode(200)
  @Post()
  async singIn(@Body() body: any) {
    const user = await this.authService.findOne(body.email);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }
    const validatePassword = bcrypt.compareSync(body.password, user.password);
    if (!validatePassword) {
      throw new HttpException('Something went wrong', HttpStatus.UNAUTHORIZED);
    } else {
      const token = { email: user.email, id: user._id };
      body.token = 'token';
      const payload = {
        message: 'User logged in successfully',
        token: jwt.sign(token, process.env.JWT_SECRET),
      };
      return this.authService.signIn(payload);
    }
  }
}
