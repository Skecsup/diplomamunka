import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Product {
  @Prop()
  title: string;
  @Prop()
  desc: string;
  @Prop()
  price: number;
  @Prop()
  img: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
