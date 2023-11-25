// create-order.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
  IsArray,
  IsMongoId,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

class OrderEntry {
  @IsNotEmpty()
  @IsMongoId()
  readonly product: {
    type: ObjectId;
    ref: 'Product';
  };

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly quantity: {
    type: number;
    default: 0;
  };
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly owner: {
    type: ObjectId;
    ref: 'Customer';
  };

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly totalPrice: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderEntry)
  readonly products: OrderEntry[];
}
