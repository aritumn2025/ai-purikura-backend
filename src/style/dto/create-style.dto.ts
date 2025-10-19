import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

export class CreateStyleDto {
  @ApiProperty({ example: 'ジブリ風', description: 'スタイル名(ユーザー向け)' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'スタジオジブリのアニメーション風に変換します。',
    description: 'スタイルの説明(ユーザー向け)',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'https://example.com/images/ghibli_style_reference.png',
    description: 'スタイル参考画像のURL(ユーザー向け)',
  })
  @IsOptional()
  @IsUrl({}, { message: 'imageUrl must be a valid URL' })
  imageUrl?: string;

  @ApiProperty({
    example:
      'Transform this image into Studio Ghibli animation style with hand-drawn animation look, soft colors, whimsical atmosphere, magical elements, detailed backgrounds, Miyazaki-inspired art style, dreamy and fantastical mood.',
    description: '生成プロンプト',
  })
  @IsNotEmpty()
  @IsString()
  prompt: string;
}
