import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

import * as errors from '../errors';
import { Template, TemplateDocument } from './template.schema';
import { CreateTemplateDto, FindByNameTemplateDto } from './template.dto';

@Injectable()
export class TemplatesService {
  constructor(
    @InjectModel(Template.name) private templateModel: Model<TemplateDocument>,
  ) {}

  async findAll(): Promise<Template[]> {
    let items;
    try {
      items = await this.templateModel.find().exec();
    } catch {
      throw new InternalServerErrorException(errors.UnexpectedError);
    }
    return items;
  }

  async find(name: string, version: number): Promise<Template> {
    let template;
    try {
      template = await this.templateModel.findOne({ name, version }).exec();
    } catch {
      throw new InternalServerErrorException(errors.UnexpectedError);
    }
    return template;
  }

  async findTypes() {
    let items;

    try {
      items = await this.templateModel.distinct('name').exec();
    } catch {
      throw new InternalServerErrorException(errors.UnexpectedError);
    }
    return items;
  }

  async findByName(
    findByNameTemplateDto: FindByNameTemplateDto,
  ): Promise<Template[]> {
    let items;

    try {
      items = await this.templateModel.find(findByNameTemplateDto).exec();
    } catch {
      throw new InternalServerErrorException(errors.UnexpectedError);
    }
    return items;
  }

  async findById(id: string): Promise<Template> {
    let template;
    try {
      template = await this.templateModel.findById({ _id: id }).exec();
    } catch {
      throw new InternalServerErrorException(errors.UnexpectedError);
    }

    return template;
  }

  async create(createTemplateDto: CreateTemplateDto): Promise<Template> {
    const item = new this.templateModel(createTemplateDto);
    let template;

    try {
      template = item.save();
    } catch {
      throw new InternalServerErrorException(errors.CreationFailed);
    }
    return template;
  }

  async update(
    id: string,
    createTemplateDto: CreateTemplateDto,
  ): Promise<Template> {
    let template;
    try {
      template = await this.templateModel.findByIdAndUpdate(
        { _id: id },
        createTemplateDto,
        { new: true },
      );
    } catch {
      throw new InternalServerErrorException(errors.UpdateFailed);
    }

    return template;
  }

  async remove(id: string): Promise<any> {
    try {
      await this.templateModel.deleteOne({ _id: id });
    } catch {
      throw new InternalServerErrorException(errors.DelitionFailed);
    }

    return;
  }
}
