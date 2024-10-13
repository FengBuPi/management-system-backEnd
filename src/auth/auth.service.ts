import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
// jwt生成器
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private jwtService: JwtService) { }

  // 判断用户是否存在后发放jwt版本的token
  async signIn(username: string, pw: string): Promise<any> {
    const user = await this.userService.getUserByUsername(username);

    if (!user) throw new UnauthorizedException("用户不存在")

    if (user?.password != pw) throw new UnauthorizedException("密码错误")

    const access_token: string = await this.jwtService.signAsync({ sub: user.id, username: user.username }, { expiresIn: '10s' });// 短token
    const refresh_token: string = await this.jwtService.signAsync({ sub: user.id, }, { expiresIn: '30h' });// 长token
    return {
      access_token,
      refresh_token
    };
  }

  // 刷新双token的方法
  async refresh(refreshToken: string) {
    const token = this.extractTokenFromHeader(refreshToken)
    // 从长token中获取当前用户id
    const data = this.jwtService.verify(token);
    // 根据id查询一个用户
    const user = await this.userService.getUserById(data.userId);
    // 全新的长短token
    const access_token: string = await this.jwtService.signAsync({ sub: user.id, username: user.username }, { expiresIn: '10s' });
    const refresh_token: string = await this.jwtService.signAsync({ sub: user.id, }, { expiresIn: '10m' });
    return {
      access_token,
      refresh_token
    }
  }

  /**
   * 从请求的 Authorization 头中提取 JWT 令牌。
   * 
   * @param request Express 请求对象。
   * @returns 返回提取到的 JWT 令牌，如果不存在或格式错误则返回 undefined。
   */
  private extractTokenFromHeader(request: string): string | undefined {
    // 分割 Authorization 头，预期格式为 'Bearer {token}'。
    const [type, token] = request?.split(' ') ?? [];
    // 确保类型为 'Bearer' 且存在 token 时才返回 token。
    return type === 'Bearer' ? token : undefined;
  }
}   