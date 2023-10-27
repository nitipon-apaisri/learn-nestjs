import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import UserType from 'src/types/userType';

@Injectable()
export class ValidateFields implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const fields = Object.keys(request.body);
    if (fields.length !== Object.keys(UserType).length) {
      throw new HttpException('Missing fields', HttpStatus.BAD_REQUEST);
    }
    return true;
  }
}
