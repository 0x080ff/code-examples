import { Module } from '@nestjs/common';

import { GenDocsController } from './gen-docs.controller';
import { TemplatesModule } from '../templates/templates.module';

@Module({
  imports: [TemplatesModule],
  controllers: [GenDocsController],
  providers: [],
})
export class GenDocsModule {}