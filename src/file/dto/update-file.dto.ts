import { PartialType } from '@nestjs/swagger';
import { CreateFileDto } from './create-file.dto';

export class UpdateFileDto {
  fileName?: string; // 文件名，这个通常从上传的文件对象中获取
  fileHash?: string;
  chunkIndex?: string;
  description?: string; // 文件描述，可选
}