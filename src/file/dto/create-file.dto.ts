// create-file.dto.ts
export class CreateFileDto {
  fileNName?: string; // 文件名，这个通常从上传的文件对象中获取
  fileHash?: string;
  chunkIndex?: string;
  description?: string; // 文件描述，可选
  // 其他可能需要的字段，比如分类id, 标签等
}