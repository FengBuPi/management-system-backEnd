import { Controller, UploadedFiles, Get, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor, FilesInterceptor, } from '@nestjs/platform-express';


@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) { }
  // 单文件上传接口
  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateFileDto
  ): Promise<{ msg: string, url: string }> {
    const fileUrl = await this.fileService.uploadFile(file, body);
    return { msg: "上传简单", url: fileUrl };
  }


  // 多文件上传接口
  @Post('uploadFiles')
  // 使用文件拦截器拦截上传的文件，'files' 是字段名，20 是最大文件数量，dest 是文件存储目录
  @UseInterceptors(FilesInterceptor('files', 20, {
    dest: 'uploads'
  }))
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>, // 通过装饰器获取上传的文件数组
    @Body() body: any) {
    console.log('body', body);
    console.log('files', files);
    return {}
  }

}
