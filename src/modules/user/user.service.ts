import { Injectable } from '@nestjs/common';
import { bd } from '../../moks';

@Injectable()
export class UserService {
  getUsers(){
    return bd
  }
}
