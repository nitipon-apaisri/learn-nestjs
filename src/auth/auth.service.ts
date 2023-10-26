import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async findOne(email: string) {
    const user = await this.userModel.findOne({ email: email });
    return user;
  }
  async signIn(body: any) {
    console.log(body);
    return body;
  }
}
