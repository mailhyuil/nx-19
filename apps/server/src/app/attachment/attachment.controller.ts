import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateAttachmentDto } from './attachment.dto';
import { AttachmentService } from './attachment.service';

@Controller({ path: 'attachments', version: '1' })
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.attachmentService.findById(id);
  }

  @Post()
  async create(@Body() body: CreateAttachmentDto) {
    return await this.attachmentService.create(body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.attachmentService.remove(id);
  }
}
