import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { StyleService } from './style.service';
import { CreateStyleDto } from './dto/create-style.dto';
import { UpdateStyleDto } from './dto/update-style.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('style')
@Controller('style')
export class StyleController {
  constructor(private readonly styleService: StyleService) {}

  @Post()
  @ApiOperation({ summary: '新しいスタイルを作成' })
  @ApiResponse({ status: 201, description: 'スタイルが作成されました' })
  @ApiResponse({ status: 400, description: 'リクエストが不正' })
  create(@Body() dto: CreateStyleDto) {
    return this.styleService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: '全てのスタイルを取得' })
  @ApiResponse({ status: 200, description: 'スタイル一覧を取得しました。' })
  findAll() {
    return this.styleService.findAll();
  }

  @Get('public')
  @ApiOperation({ summary: '全てのスタイルを取得(エンドユーザー向け)' })
  @ApiResponse({ status: 200, description: '公開スタイル一覧を取得しました。' })
  findAllPublic() {
    return this.styleService.findAllForUser();
  }

  @Get(':id')
  @ApiOperation({ summary: '指定したスタイルを取得' })
  @ApiResponse({ status: 200, description: 'スタイルを取得しました。' })
  @ApiResponse({
    status: 404,
    description: '指定されたスタイルが存在しません。',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.styleService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'スタイル情報を更新' })
  @ApiResponse({ status: 200, description: 'スタイルを更新しました。' })
  @ApiResponse({ status: 400, description: 'リクエストが不正' })
  @ApiResponse({
    status: 404,
    description: '指定されたスタイルが存在しません。',
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateStyleDto) {
    return this.styleService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'スタイルを削除' })
  @ApiResponse({ status: 200, description: 'スタイルを削除しました。' })
  @ApiResponse({
    status: 404,
    description: '指定されたスタイルが存在しません。',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.styleService.remove(id);
  }
}
