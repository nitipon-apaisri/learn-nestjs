import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import UserType from 'src/types/userType';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  @UseGuards(AuthGuard)
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':email')
  getUserByEmail(@Param('email') email: string) {
    return this.userService.getUserByEmail(email);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: typeof UserType) {
    const fields = Object.keys(body);
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(body.password, salt);
    body.password = hash;
    const isDuplicate = await this.userService.getUserByEmail(body.email);
    if (isDuplicate === null) {
      if (fields.length !== Object.keys(UserType).length) {
        throw new HttpException('Missing fields', HttpStatus.BAD_REQUEST);
      }
      return this.userService.createUser(body);
    } else {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
  }
}
