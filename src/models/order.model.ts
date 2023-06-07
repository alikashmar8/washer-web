import { OrderStatus } from 'src/common/enums/order-status.enum';
import { OrderItem } from './order-item.model';
import { User } from './user.model';

export class Order {
  id: number;
  total: number;
  userId: string;
  user: User;
  orderItems: OrderItem[];
  status: OrderStatus;
  promoCode: string;
  discountAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}
