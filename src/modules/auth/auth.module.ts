import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { env } from 'src/shared/config/env';

@Module({
  imports: [
    JwtModule.register({
      global: true, //para que o jwt seja acessível em todo o projeto
      //secret deve está na variavel de ambiente
      secret: env.jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule],
})
export class AuthModule {}
