import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.decorators';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()// 公共方法，无需授权
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  // 刷新token的方法
  @Get('refresh')
  async refresh(@Headers('Authorization') refreshToken: string,) {
    try {
      return this.authService.refresh(refreshToken)
    } catch (e) {
      throw new UnauthorizedException('刷新token 已失效，请重新登录');
    }
  }

  // token授权成功测试接口
  // @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return {
      msg: "验证通过"
    };
  }
}
