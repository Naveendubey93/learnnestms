import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document  } from 'mongoose';

@Schema()
export class AbstractDocument extends Document {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}

export const AbstractDocumentSchema = SchemaFactory.createForClass(AbstractDocument);