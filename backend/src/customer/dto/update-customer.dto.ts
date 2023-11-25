import { IsString, IsOptional } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  readonly name: string;
  @IsOptional()
  @IsString()
  readonly address: string;
}
