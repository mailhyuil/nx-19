import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../../prisma/prisma.service';
import { AttachmentDto, CreateAttachmentDto } from './attachment.dto';

@Injectable()
export class AttachmentService {
  constructor(private readonly prismaService: PrismaService) {}

  async findById(id: string) {
    const found = await this.prismaService.attachment.findUniqueOrThrow({
      where: { id },
    });
    return plainToInstance(AttachmentDto, found);
  }
  async create(data: CreateAttachmentDto) {
    const created = await this.prismaService.attachment.create({ data });
    return plainToInstance(AttachmentDto, created);
  }

  async remove(id: string) {
    await this.prismaService.attachment.delete({
      where: { id },
    });
  }
}
