import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema()
export class Template {
  @Prop()
  name: string;

  @Prop()
  version: number;

  @Prop()
  data: string;

  @Prop({ type: Object })
  structure: object;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
