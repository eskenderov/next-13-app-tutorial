import { Product } from "@prisma/client";

interface CartType {
  items: CartProduct[];
  totalPrice: number;
  totalCount: number;
  productsIds: number[];
}


interface CartProduct {
  id: number;
  product: Product;
  quantity: number;
}
