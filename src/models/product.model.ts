import { Currency } from "src/common/enums/currency.enum";
import { Category } from "./category.model";
import { ProductImage } from "./product-image,model";

export class Product {
  id: number;
  title: string;
  description?: string;
  price: number;
  views: number;
  currency: Currency;
  images: ProductImage[];
  // orderItems: OrderItem[];
  categoryId: string;
  category: Category;
  createdAt: Date;
  updatedAt: Date;
  name: any;
  quantity: any;
  category_id: any;
}
