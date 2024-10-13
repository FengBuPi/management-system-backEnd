import { Controller, UploadedFiles, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileService } from './file.service';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor, FilesInterceptor, } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('file')
@ApiTags('文件上传接口(\\file)')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @ApiOperation({ summary: '单文件上传', description: '单文件上传接口' })
  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateFileDto
  ): Promise<{ msg: string, url: string }> {
    const fileUrl = await this.fileService.uploadFile(file, body);
    return { msg: "上传完成", url: fileUrl };
  }

  @ApiOperation({ summary: '多文件上传', description: '多文件上传接口' })
  @Post('uploadFiles')
  // 使用文件拦截器拦截上传的文件，'files' 是字段名，20 是最大文件数量，dest 是文件存储目录
  @UseInterceptors(FilesInterceptor('files', 20, {
    dest: 'uploads'
  }))
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>, // 通过装饰器获取上传的文件数组
    @Body() body: any) {
    console.log('uploadFiles.body', body);
    console.log('uploadFiles.files', files);
    return {}
  }
}
