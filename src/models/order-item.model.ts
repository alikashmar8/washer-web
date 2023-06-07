import { Product } from "./product.model";

export class OrderItem {
  id: number;
  quantity: number;
  price: number;
  productId: number;
  product: Product;
}
