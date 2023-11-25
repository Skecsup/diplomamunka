import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from './schemas/customer.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name)
    private customerModel: mongoose.Model<Customer>,
  ) {}

  async findAll(query: Query): Promise<Customer[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const customers = await this.customerModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return customers;
  }

  async create(customer: Customer): Promise<Customer> {
    const res = await this.customerModel.create(customer);
    return res;
  }
  async findById(id: string): Promise<Customer> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('customer not found');
    }

    const customer = await this.customerModel.findById(id);
    if (!customer) {
      throw new NotFoundException('customer not found');
    }
    return customer;
  }
  async updateById(id: string, customer: Customer): Promise<Customer> {
    return await this.customerModel.findByIdAndUpdate(id, customer, {
      new: true,
      runValidators: true,
    });
  }
  async deleteById(id: string): Promise<Customer> {
    return await this.customerModel.findByIdAndDelete(id);
  }
}
