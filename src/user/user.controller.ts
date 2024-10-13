import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/User.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('用户接口(\\user)')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: '获取全部用户数据', description: '获取全部用户数据的接口' })
  @Get('getUser')
  getUser(): any {
    return this.userService.getAllUser()
  }

  @ApiOperation({ summary: '根据用户id获取用户数据', description: '根据用户id获取用户数据的接口' })
  @Get('getUserById')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({ summary: '根据用户名称获取用户数据', description: '根据用户名称获取用户数据的接口' })
  @Post('getUserByUsername')
  async getUserByUsername(@Body("name") name: string) {
    if (!name) {
      return {
        msg: "参数不得为空"
      }
    }
    const res = await this.userService.getUserByUsername(name);
    if (res) {
      // 查找到了
      return res
    } else {
      // 没有查找到
      return {
        msg: "没有查找到",
        data: ""
      }
    }
  }

  @ApiOperation({ summary: '创建用户数据', description: '创建用户数据的接口' })
  @Post('createUser')
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @ApiOperation({ summary: '更新用户数据', description: '更新用户数据的接口' })
  @Put(':id')
  updateUserById(@Param('id') id: number, @Body() user: User) {
    return this.userService.updateUserById(id, user);
  }

  @ApiOperation({ summary: '删除用户数据', description: '删除用户数据的接口' })
  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }
}
