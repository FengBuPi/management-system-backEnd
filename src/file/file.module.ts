import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MulterModule } from '@nestjs/platform-express'; // 开发上传文件接口的包
import { diskStorage } from 'multer';// 开发上传文件接口的包
import * as path from 'path';
@Module({
  imports: [
    // 文件上传配置
    MulterModule.register({
      storage: diskStorage({
        // 指定文件存储目录
        destination: path.join(__dirname, '../uploads'),
        // 通过时间戳来重命名上传的文件名
        filename: (_, file, callback) => {
          const fileName = `${new Date().getTime() + path.extname(file.originalname)}`;
          return callback(null, fileName);
        },
      }),
    }),],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule { }
