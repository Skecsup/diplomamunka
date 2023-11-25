import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  owner: {
    type: mongoose.Schema.Types.ObjectId;
    ref: 'Customer';
  };
  @Prop({ type: Number, default: 0 })
  totalPrice: number;

  @Prop()
  products: {
    product: {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Product';
    };
    quantity: {
      type: number;
      default: 0;
    };
  }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
