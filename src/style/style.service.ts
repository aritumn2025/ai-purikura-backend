import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStyleDto, UpdateStyleDto } from './dto';

@Injectable()
export class StyleService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * スタイルが存在するか確認し、存在しなければ例外を投げる
   * @param id
   * @returns 取得したレコード
   */
  private async ensureExists(id: number) {
    const style = await this.prisma.style.findUnique({ where: { id } });
    if (!style) throw new NotFoundException(`Style (id=${id}) not found`);
    return style;
  }

  async create(data: CreateStyleDto) {
    return this.prisma.style.create({ data });
  }
  async findAll() {
    return this.prisma.style.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const style = await this.ensureExists(id);
    return style;
  }

  async findAllForUser() {
    return this.prisma.style.findMany({
      orderBy: { id: 'asc' },
      select: {
        id: true,
        name: true,
        description: true,
        imageUrl: true,
      },
    });
  }

  async update(id: number, data: UpdateStyleDto) {
    await this.ensureExists(id);
    return this.prisma.style.update({ where: { id }, data });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.style.delete({ where: { id } });
  }
}
