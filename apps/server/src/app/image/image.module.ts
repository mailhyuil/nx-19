import { ImageController } from './image.controller';
import { ImageService } from './image.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ImageController],
  providers: [ImageService],
})
export class ImageModule {}
