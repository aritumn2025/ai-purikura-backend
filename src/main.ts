import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // バリデーションパイプ設定
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTOに定義されていないプロパティを自動削除
      forbidNonWhitelisted: true, // 未定義のプロパティがあるとエラーに
      transform: true, // 自動で型変換（文字列→数値など）
    }),
  );

  // Swagger設定
  const config = new DocumentBuilder()
    .setTitle('AI Purikura API')
    .setDescription('AIプリクラシステムのバックエンドAPI仕様')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
