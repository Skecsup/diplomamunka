import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Customer {
  @Prop()
  name: string;

  @Prop()
  address: string;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
