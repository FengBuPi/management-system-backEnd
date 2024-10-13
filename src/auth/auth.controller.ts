import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Public } from './auth.decorators';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('守卫接口(\\auth)')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: '登录', description: '登录接口' })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()// 公共方法，无需授权
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @ApiOperation({ summary: '刷新token', description: '刷新token接口' })
  @Get('refresh')
  async refresh(@Headers('Authorization') refreshToken: string,) {
    try {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.authService.refresh(refreshToken))
        }, 5000)
      })
    } catch (e) {
      throw new UnauthorizedException('刷新token 已失效，请重新登录');
    }
  }

  @ApiOperation({ summary: 'token授权成功接口', description: 'token授权成功测试接口' })
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile() {
    console.log("验证通过")
    return {
      msg: "验证通过"
    };
  }
}
