import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { AttachmentDto } from '../attachment/attachment.dto';

export class CommentDto {
  id: string;
  content: string;
  createdAt: Date;
  commentId: string;
  comment: CommentDto;
  attachments: AttachmentDto[];
}

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  postId: string;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
