import { Module } from '@nestjs/common';
import { StyleService } from './style.service';
import { StyleController } from './style.controller';

@Module({
  // PrismaModuleのインポートはグローバル化しているため不要
  providers: [StyleService],
  controllers: [StyleController],
})
export class StyleModule {}
