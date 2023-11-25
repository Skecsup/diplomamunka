import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly address: string;
}
