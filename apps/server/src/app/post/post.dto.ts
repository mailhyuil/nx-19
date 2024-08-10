import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AttachmentDto } from '../attachment/attachment.dto';
import { CommentDto } from '../comment/comment.dto';

export class PostDto {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  attachments: AttachmentDto[];
  comments: CommentDto[];
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
