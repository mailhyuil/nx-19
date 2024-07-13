import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto, PostDto, UpdatePostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    const found = await this.prismaService.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        snapshots: {
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            postId: true,
            title: true,
            content: true,
            createdAt: true,
            attachments: {
              select: {
                id: true,
                url: true,
              },
            },
          },
        },
      },
    });

    return plainToInstance(
      PostDto,
      found.map((post) => post.snapshots[0])
    );
  }
  async findById(id: string) {
    const [found] = await this.prismaService.post
      .findUniqueOrThrow({
        where: { id },
      })
      .snapshots({
        take: 1,
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          postId: true,
          title: true,
          content: true,
          createdAt: true,
          attachments: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      });
    return plainToInstance(PostDto, found);
  }

  async create(data: CreatePostDto, id?: string) {
    const created = await this.prismaService.postSnapshot.create({
      data: {
        ...data,
        post: {
          create: id ? undefined : {},
          connect: id ? { id } : undefined,
        },
      },
    });
    return plainToInstance(PostDto, created);
  }

  // patch update 시
  async update(id: string, data: UpdatePostDto) {
    const updated = await this.prismaService.$transaction(async (tx) => {
      const [found] = await tx.post
        .findUniqueOrThrow({
          where: { id },
        })
        .snapshots({
          take: 1,
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            title: true,
            content: true,
            attachments: {
              select: {
                id: true,
              },
            },
          },
        });
      const updated = await this.prismaService.postSnapshot.create({
        data: {
          title: found.title,
          content: found.content,
          ...data,
          post: {
            connect: { id },
          },
        },
        select: {
          postId: true,
          title: true,
          content: true,
          createdAt: true,
          attachments: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      });
      return updated;
    });
    return plainToInstance(PostDto, updated);
  }

  async remove(id: string) {
    await this.prismaService.post.delete({
      where: { id },
    });
  }
}
