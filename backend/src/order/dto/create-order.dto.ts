// create-order.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  Min,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto';
import { CreateProductDto } from 'src/product/dto/create-product.dto';

class OrderEntry {
  @ValidateNested()
  @Type(() => CreateProductDto)
  product: CreateProductDto;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  quantity: number;
}

export class CreateOrderDto {
  @ValidateNested()
  @Type(() => CreateCustomerDto)
  readonly owner: CreateCustomerDto;

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
