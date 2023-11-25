import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;
  @IsNotEmpty()
  @IsString()
  readonly desc: string;
  @IsNotEmpty()
  @IsString()
  readonly img: string;
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
}
