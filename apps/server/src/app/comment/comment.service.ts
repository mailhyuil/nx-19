import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../../prisma/prisma.service';
import { CommentDto, CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string) {
    const found = await this.prismaService.comment.findUnique({
      where: { id },
    });
    return plainToInstance(CommentDto, found);
  }

  async create(data: CreateCommentDto) {
    const created = await this.prismaService.comment.create({ data });
    return plainToInstance(CommentDto, created);
  }

  async update(id: string, data: UpdateCommentDto) {
    const updated = await this.prismaService.comment.update({
      where: { id },
      data,
    });
    return plainToInstance(CommentDto, updated);
  }

  async remove(id: string) {
    await this.prismaService.comment.delete({
      where: { id },
    });
  }
}
