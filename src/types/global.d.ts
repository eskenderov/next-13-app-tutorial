import { Product } from "@prisma/client";

interface CartType {
  items: Product[];
  totalPrice: number;
  totalCount: number;
  productsIds: number[];
}
