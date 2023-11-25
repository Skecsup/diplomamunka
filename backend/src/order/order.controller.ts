import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrders(@Query() query: ExpressQuery): Promise<Order[]> {
    return this.orderService.findAll(query);
  }

  @Post()
  async createOrder(
    @Body()
    order: CreateOrderDto,
  ): Promise<Order> {
    return this.orderService.create(order);
  }

  @Get(':id')
  async getOrder(
    @Param('id')
    id: string,
  ): Promise<Order> {
    return this.orderService.findById(id);
  }

  @Delete(':id')
  async deleteOrder(
    @Param('id')
    id: string,
  ): Promise<Order> {
    return this.orderService.deleteById(id);
  }
}
