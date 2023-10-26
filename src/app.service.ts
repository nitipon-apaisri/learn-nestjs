import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World123!';
  }
}
@Injectable()
export class CatsService {
  findAll(): string {
    return 'This action returns all cats';
  }
}
