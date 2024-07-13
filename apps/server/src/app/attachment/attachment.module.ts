import { AttachmentController } from './attachment.controller';
import { AttachmentService } from './attachment.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AttachmentController],
  providers: [AttachmentService],
})
export class AttachmentModule {}
