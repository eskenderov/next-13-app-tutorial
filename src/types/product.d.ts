export interface CategoryType {
  id: number;
  title: string;
  tab: string;
  products: Product[];
}

// Тип для модели Product
export interface ProductType {
  id: number;
  title: string;
  image: string;
  description: string;
  category?: Category; // Объект типа Category или undefined
  categoryTab?: string; // ID категории или undefined
  price?: number | null; // Цена может быть числом, но также может быть null
  count: number;
  createdAt: Date;
  updatedAt: Date;
}
