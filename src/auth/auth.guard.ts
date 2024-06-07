import {
  CanActivate, // 用于定义守卫
  ExecutionContext,// 执行上下文
  Injectable, // 未授权异常
  UnauthorizedException, // 标记服务为可注入
} from '@nestjs/common';
// 处理JWT的生成和验证
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from './auth.decorators'
import { Reflector } from '@nestjs/core';

/**
 * 定义 AuthGuard 类，实现 CanActivate 接口以充当 Nest.js 应用程序中的认证守卫。
 * 负责验证传入请求中的 JWT 令牌，并处理未授权情况。
 */
@Injectable()
export class AuthGuard implements CanActivate {
  /**
   * 构造函数初始化 JWT 服务和反射器，这两个都是认证过程中必需的依赖。
   *
   * @param jwtService 用于 JWT 令牌的生成与验证服务。
   * @param reflector 用于读取控制器和方法上的自定义装饰器元数据。
   */
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  /**
   * canActivate 方法决定请求是否可以继续执行。
   * 
   * @param context 提供执行上下文，从中可以获取到请求和响应对象。
   * @returns 返回一个 Promise，解析为布尔值，指示是否允许请求继续。
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 检查控制器或方法是否标记为公开，如果是，则无需认证直接放行。
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 携带了@Public()装饰器,说明可以放行
    if (isPublic) {
      return true;
    }

    // 从 HTTP 请求中提取 JWT 令牌。
    const request: Request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // 如果没有找到有效的 JWT 令牌，则说明没有登录
    if (!token) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      // 验证 JWT 令牌，并将有效载荷存储在请求对象中，便于后续使用。
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['user'] = payload;
    } catch {
      // 验证失败时，同样抛出未授权异常。
      throw new UnauthorizedException('token 失效，请重新登录');
    }
    // 验证通过，允许请求继续。
    return true;
  }

  /**
   * 从请求的 Authorization 头中提取 JWT 令牌。
   * 
   * @param request Express 请求对象。
   * @returns 返回提取到的 JWT 令牌，如果不存在或格式错误则返回 undefined。
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    // 分割 Authorization 头，预期格式为 'Bearer {token}'。
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // 确保类型为 'Bearer' 且存在 token 时才返回 token。
    return type === 'Bearer' ? token : undefined;
  }
}