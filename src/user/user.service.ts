import { Injectable } from '@nestjs/common';
// 使用typeorm的模块
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  // 查询所有用户
  async getAllUser() {
    // const res = await this.userRepository.find()  // 查询所有
    const res = await this.userRepository.query(`select * from users`)
    return {
      data: res
    }
  }

  // 根据id查询一个用户
  async getUserById(id: number): Promise<User | null> {
    const res = await this.userRepository.findOne({ where: { id } }) // 根据id查询单个
    return res
  }

  // 根据用户名称查找用户
  async getUserByUsername(username: string): Promise<User | null> {
    const res = await this.userRepository.findOne({ where: { username } });
    return res
  }

  // 创建用户
  async create(user: User) {
    return this.userRepository.save(user);
  }

  // 跟新用户数据
  async updateUserById(id: number, user: User) {
    const res = await this.userRepository.update(id, user)
    return {
      data: res
    }
  }

  // 删除用户
  async deleteUserById(id: number) {
    const res = await this.userRepository.delete(id)
    return {
      data: res
    }
  }

  // // 登录模块相关
}
