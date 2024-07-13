import { PartialType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { AttachmentDto } from '../attachment/attachment.dto';

export class PostDto {
  @Expose({
    name: 'postId',
  })
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  attachments: AttachmentDto[];
}

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
