import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  readonly title: string;
  @IsOptional()
  @IsString()
  readonly desc: string;
  @IsOptional()
  @IsString()
  readonly img: string;
  @IsOptional()
  @IsNumber()
  readonly price: number;
}
