import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateCommentDto } from './comment.dto';
import { CommentService } from './comment.service';

@Controller({ path: 'comments', version: '1' })
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.commentService.findById(id);
  }

  @Post()
  async create(@Body() body: CreateCommentDto) {
    return await this.commentService.create(body);
  }

  @Post(':id')
  async update(@Param('id') id: string, @Body() body: CreateCommentDto) {
    return await this.commentService.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.commentService.remove(id);
  }
}
