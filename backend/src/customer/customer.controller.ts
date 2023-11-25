import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './schemas/customer.schema';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('customers')
export class CustomerController {
  constructor(private customerService: CustomerService) {}
  @Get()
  async getAllCustomers(@Query() query: ExpressQuery): Promise<Customer[]> {
    return this.customerService.findAll(query);
  }

  @Post()
  async createCustomer(
    @Body()
    customer: CreateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.create(customer);
  }

  @Get(':id')
  async getCustomer(
    @Param('id')
    id: string,
  ): Promise<Customer> {
    return this.customerService.findById(id);
  }

  @Put(':id')
  async updateCustomer(
    @Param('id')
    id: string,
    @Body()
    customer: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customerService.updateById(id, customer);
  }

  @Delete(':id')
  async deleteCustomer(
    @Param('id')
    id: string,
  ): Promise<Customer> {
    return this.customerService.deleteById(id);
  }
}
