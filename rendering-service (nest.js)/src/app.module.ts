import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TemplatesModule } from './templates/templates.module';
import { GenDocsModule } from './gen-docs/gen-docs.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URL, { dbName: 'drs' }),
    TemplatesModule,
    GenDocsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
