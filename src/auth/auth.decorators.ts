// 自定义装饰器
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
// 可以使用@Public()装饰器装饰任何方法，使当前被装饰的接口无需进行任何的权限验证
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
