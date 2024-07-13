import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { PostService } from './post.service';

@Controller({ path: 'posts', version: '1' })
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.postService.findById(id);
  }

  @Post()
  async create(@Body() body: CreatePostDto) {
    return await this.postService.create(body);
  }

  @Post(':id')
  async put(@Param('id') id: string, @Body() body: CreatePostDto) {
    return await this.postService.create(body, id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.postService.remove(id);
  }
}
