import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
// jwt
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { AuthGuard } from './auth.guard';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [UserModule,
    JwtModule.register({
      // 全局配置,可以直接注入并使用@Inject(JwtService)来获取JwtService实例
      global: true,
      // 签名密钥（secret）
      secret: jwtConstants.secret,
      // 签发出去的jwt的过期时间,时间单位可以是秒（s）、分钟（m）、小时（h）、天（d）等
      signOptions: { expiresIn: '60s' },
    }),],
  controllers: [AuthController],
  providers: [AuthService,
    {
      // 告诉Nest你要注册的是一个全局守卫
      provide: APP_GUARD,
      // 指定实际要使用的守卫类是AuthGuard
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule { }
