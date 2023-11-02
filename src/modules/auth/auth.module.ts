import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';
import { JwtStrategy } from 'src/strategy/JwtStrategy';

@Module({
  imports:[UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
