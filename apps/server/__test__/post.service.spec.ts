import { Test, TestingModule } from '@nestjs/testing';
import { Prisma } from '@prisma/client';
import { PostDto } from '../src/app/post/post.dto';
import { PostService } from '../src/app/post/post.service';
import { PrismaService } from '../src/prisma/prisma.service';
const createdAt = new Date();
const result: PostDto[] = [
  {
    id: 'test',
    title: 'post_title',
    content: 'post_content',
    attachments: [],
    createdAt,
  },
];

type PostSnapshotWithAttachments = Prisma.PostSnapshotGetPayload<{
  include: {
    attachments: {
      select: {
        id: true;
        url: true;
      };
    };
  };
}>;

const snapshot: PostSnapshotWithAttachments = {
  id: 'test',
  postId: 'test',
  title: 'post_title',
  content: 'post_content',
  attachments: [],
  createdAt,
};

const one = result[0];

const db = {
  post: {
    findMany: jest
      .fn()
      .mockResolvedValue([{ id: 'test', snapshots: [snapshot] }]),
    findUnique: jest.fn().mockResolvedValue(one),
    findUniqueOrThrow: jest.fn().mockResolvedValue(one),
    findFirst: jest.fn().mockResolvedValue(one),
    findFirstOrThrow: jest.fn().mockResolvedValue(one),
    create: jest.fn().mockResolvedValue(one),
    update: jest.fn().mockResolvedValue(one),
    upsert: jest.fn().mockResolvedValue(one),
    delete: jest.fn().mockResolvedValue(one),
  },
};

describe('PostService', () => {
  let prisma: PrismaService;
  let service: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of posts', async () => {
      const found = await service.findAll();
      expect(found).toEqual(result);
    });
  });
});
