import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
  id: string;
  content: string;
  createdAt: Date;
  comment: CommentDto;
  commentId: string;
  comments: CommentDto[];
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
