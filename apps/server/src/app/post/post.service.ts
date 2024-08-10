import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto, PostDto, UpdatePostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    const found = await this.prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return plainToInstance(PostDto, found);
  }

  async findById(id: string) {
    const found = await this.prisma.post.findUnique({
      where: { id },
    });
    return plainToInstance(PostDto, found);
  }

  async create(data: CreatePostDto, id?: string) {
    const created = await this.prisma.post.create({
      data: {
        ...data,
        snapshots: {
          create: {
            title: data.title,
            content: data.content,
          },
        },
      },
    });
    return plainToInstance(PostDto, created);
  }

  // patch update 시
  async update(id: string, data: UpdatePostDto) {
    const updated = await this.prisma.$transaction(async (tx) => {
      const found = await tx.post.findUniqueOrThrow({
        where: { id },
      });
      const updated = await tx.post.update({
        where: {
          id,
        },
        data: {
          ...data,
          snapshots: {
            create: {
              ...found,
              ...data,
            },
          },
        },
      });
      return updated;
    });
    return plainToInstance(PostDto, updated);
  }

  async remove(id: string) {
    await this.prisma.post.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
