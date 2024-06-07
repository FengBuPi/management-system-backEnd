import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/User.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @ApiTags('获取全部用户数据') //标记controller名称
  @ApiOperation({ summary: '获取全部用户数据', description: '获取全部用户数据的描述' })
  @Get('getUser')
  getUser(): any {
    return this.userService.getAllUser()
  }
  @Get('getUserById')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @ApiOperation({
    summary: "登录接口"
  })
  @Post('login')
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

  @Post('createUser')
  create(@Body() user: User) {
    return this.userService.create(user);
  }

  @Put(':id')
  updateUserById(@Param('id') id: number, @Body() user: User) {
    return this.userService.updateUserById(id, user);
  }

  @Delete(':id')
  deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(id);
  }

  // 登录模块相关

}
