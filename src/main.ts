// import { CorsOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 配置swagger
  const options = new DocumentBuilder()
    .setTitle('接口文档')//标题
    .setDescription('描述信息')//文档描述
    .setVersion('1.0.0')//文档版本号
    .build();
  const document = SwaggerModule.createDocument(
    app,//应用程序实例
    options//Swagger 配置对象
  );
  SwaggerModule.setup(
    'apiDocs',//Swagger UI 的挂载路径
    app,//应用程序实例
    document//上面已经实例化的文档对象
  );
  // SwaggerModule.setup('/apiDocs', app, document);
  // 配置swagger 结束

  // 全局CORS设置
  const corsOptions = {
    origin: ['*'], // 允许的源列表，可以用 * 表示允许任何源，但需谨慎使用
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的HTTP方法
    allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
    credentials: false, // 是否允许携带cookies
  };
  // app.enableCors();
  // 全局CORS设置 结束
  await app.listen(3000);

}
bootstrap();
