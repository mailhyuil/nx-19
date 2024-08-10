import { IsNotEmpty, IsString } from 'class-validator';
import { PostDto } from '../post/post.dto';

export class AttachmentDto {
  id: string;
  name: string;
  url: string;
  extension: string;
  createdAt: Date;
  posts: PostDto[];
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
