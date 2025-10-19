import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { StyleModule } from './style/style.module';

@Module({
  imports: [PrismaModule, StyleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
