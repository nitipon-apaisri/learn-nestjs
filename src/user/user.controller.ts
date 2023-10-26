import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import UserType from 'src/types/userType';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Post()
  createUser(@Body() body: typeof UserType, @Res() res: Response) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);
    body.password = hash;
    const isDuplicate = this.userService.getUserByEmail(body.email);
    if (isDuplicate) {
      res.json({ message: 'User already exists' });
    } else {
      return this.userService.createUser(body);
    }
  }
}
