import { readFile, writeFile, rm } from 'fs/promises';
import { execSync } from 'child_process';
import Handlebars from 'handlebars';

import {
  Controller,
  Post,
  Body,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import * as errors from '../errors';
import { ValidationPipe } from './gen-doc.validation.pipe';
import { GenDocDto } from './gen-docs.dto';
import { TemplatesService } from '../templates/templates.service';

@Controller('gen_docs')
export class GenDocsController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Post()
  async genDoc(@Body(new ValidationPipe()) doc: GenDocDto) {
    const filename = doc.uid;
    let result;

    const template = await this.templatesService.find(
      doc.type,
      doc.template_version,
    );

    if (template) {
      const compile = Handlebars.compile(template.data);
      await writeFile(`tmp/${filename}.html`, String(compile(doc.data)));
    } else {
      throw new NotFoundException(errors.NotFound);
    }

    try {
      execSync(`wkhtmltopdf tmp/${filename}.html tmp/${filename}.pdf`);

      result = await readFile(`tmp/${filename}.pdf`, {
        encoding: 'base64',
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(errors.UnexpectedError);
    }

    await rm(`tmp/${filename}.html`);
    await rm(`tmp/${filename}.pdf`);

    return {
      uid: doc.uid,
      data: result,
    };
  }
}
