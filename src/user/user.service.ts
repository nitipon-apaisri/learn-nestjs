import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  getUsers() {
    return 'This action returns all users';
  }
  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
  async createUser(body: any) {
    const createdUser = new this.userModel(body);
    createdUser.save();
    return { msg: 'User created successfully' };
  }
  async updateUser(id: string, body: any) {
    await this.userModel.findByIdAndUpdate(id, body).then((res) => {
      if (!res) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      console.log(res);
      res.save();
    });

    return { msg: 'User updated successfully' };
  }
}
