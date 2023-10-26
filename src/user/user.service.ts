import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  getUsers() {
    return 'This action returns all users';
  }
  async createUser(body: any) {
    const createdUser = new this.userModel(body);
    return createdUser.save();
  }
}
