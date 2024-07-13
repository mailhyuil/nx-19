import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE, DiscoveryModule } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ClsModule } from 'nestjs-cls';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { GlobalValidationPipe } from '../pipes/global-validation.pipe';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from './../prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AttachmentModule } from './attachment/attachment.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    AttachmentModule,
    CommentModule,
    PostModule,
    PrismaModule,
    PrismaModule,
    DiscoveryModule,
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 1000, // 1 seconds
        limit: 100, // 100 requests
      },
    ]),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
      plugins: [
        new ClsPluginTransactional({
          imports: [
            PrismaModule, // module in which the PrismaClient is provided
          ],
          adapter: new TransactionalAdapterPrisma({
            prismaInjectionToken: PrismaService, // the injection token of the PrismaClient
          }),
        }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_PIPE,
      useValue: GlobalValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
