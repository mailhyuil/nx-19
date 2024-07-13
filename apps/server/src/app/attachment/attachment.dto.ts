import { IsNotEmpty, IsString } from 'class-validator';
import { CommentDto } from '../comment/comment.dto';
import { PostDto } from '../post/post.dto';

export class AttachmentDto {
  id: string;
  name: string;
  url: string;
  extension: string;
  createdAt: Date;
  attachmentId: string;
  attachment: AttachmentDto;
  posts: PostDto[];
  comments: CommentDto[];
}

export class CreateAttachmentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  extension: string;
}
