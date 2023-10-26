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
  async createUser(@Body() body: typeof UserType, @Res() res: Response) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);
    body.password = hash;
    const isDuplicate = await this.userService.getUserByEmail(body.email);
    console.log(isDuplicate);
    if (isDuplicate === null) {
      this.userService.createUser(body);
      res.json({ message: 'User created successfully' });
    } else {
      res.json({ message: 'User already exists' });
    }
  }
}
