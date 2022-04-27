import {
  Controller,
  UseGuards,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import * as errors from '../errors';
import { TemplatesService } from './templates.service';
import { CreateTemplateDto, FindByNameTemplateDto } from './template.dto';
import { ValidationPipe } from '../validation.pipe';
import { JWTGuard } from './jwt.guard';

@Controller('templates')
@UseGuards(JWTGuard)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  async findAll() {
    const items = await this.templatesService.findAll();
    return { items };
  }

  @Get('/types')
  async findTypes() {
    return await this.templatesService.findTypes();
  }

  @Get('/versions')
  async findByName(
    @Body(new ValidationPipe()) findByNameTemplateDto: FindByNameTemplateDto,
  ) {
    return await this.templatesService.findByName(findByNameTemplateDto);
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const template = await this.templatesService.findById(id);
    if (!template) throw new NotFoundException(errors.NotFound);

    return template;
  }

  @Post()
  async create(
    @Body(new ValidationPipe()) createTemplateDto: CreateTemplateDto,
  ) {
    return await this.templatesService.create(createTemplateDto);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body(new ValidationPipe()) createTemplateDto: CreateTemplateDto,
  ) {
    const template = await this.templatesService.update(id, createTemplateDto);
    if (!template) throw new NotFoundException(errors.NotFound);

    return template;
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return await this.templatesService.remove(id);
  }
}
