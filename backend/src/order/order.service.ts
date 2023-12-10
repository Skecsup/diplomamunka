import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './schemas/order.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: mongoose.Model<Order>,
  ) {}

  async findAll(query: Query): Promise<Order[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const orders = await this.orderModel.find().limit(resPerPage).skip(skip);
    return orders;
  }

  async create(order: Order): Promise<Order> {
    const res = await this.orderModel.create(order);
    return res;
  }
  async findById(id: string): Promise<Order> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('customer not found');
    }
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException('order not found');
    }
    return order;
  }

  async findOrdersByCustomer(customerId: string): Promise<Order[]> {
    return this.orderModel.find({ owner: customerId }).exec();
  }
  async deleteById(id: string): Promise<Order> {
    return await this.orderModel.findByIdAndDelete(id);
  }
}
