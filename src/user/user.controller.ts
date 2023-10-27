import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import UserType from 'src/types/userType';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/auth.guard';
import { ValidateFields } from './user.guard';

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
  @UseGuards(ValidateFields)
  async createUser(@Body() body: typeof UserType) {
    const salt = bcrypt.genSaltSync(10); // generate salt
    const hash = bcrypt.hashSync(body.password, salt); // generate hash from password
    body.password = hash; // set hash as password
    const isDuplicate = await this.userService.getUserByEmail(body.email); // check if user already exists
    if (isDuplicate === null) {
      return this.userService.createUser(body); // create user
    } else {
      throw new HttpException('User already exists', HttpStatus.CONFLICT); // throw error if user already exists
    }
  }
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  async updateUser(@Param('id') id: string, @Body() body: any) {
    await this.userService.updateUser(id, body);
  }
}
