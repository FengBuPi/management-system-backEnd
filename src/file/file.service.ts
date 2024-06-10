import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import * as fs from 'fs';
@Injectable()
export class FileService {

  async uploadFile(file: Express.Multer.File, body: UpdateFileDto): Promise<string> {
    // 到这里其实文件已经上传到服务器本地了，需要有后续的存储需求，
    // 比如要上传到云存储服务中，可以在这里继续处理
    // 返回文件URL
    console.log("uploadFile", file)
    console.log("uploadFile", body)
    return `sfklsdjkfl`;
  }

  // 合并存储在硬盘内文件的方法
  merge() {
    const chunkDir = 'uploads/chunks_' + name;

    const files = fs.readdirSync(chunkDir);

    let startPos = 0;
    files.map(file => {
      const filePath = chunkDir + '/' + file;
      const stream = fs.createReadStream(filePath);
      stream.pipe(fs.createWriteStream('uploads/' + name, {
        start: startPos
      }))

      startPos += fs.statSync(filePath).size;
    })
  }
}
