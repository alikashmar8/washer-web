import { User } from './user.model';

export class Promo {
  id: string;
  code: string;
  expiryDate?: Date;
  limit?: number;
  numberOfUsage?: number;
  userId: string;
  user: User;
  discountPercentage?: number;
  discountAmount?: number;
  isActive: boolean;
  createdAt: Date;
  modifiedAt: Date;

  public get isLimited(): boolean {
    return this.limit != null && this.limit > 0;
  }
}
