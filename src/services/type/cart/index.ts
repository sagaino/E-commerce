import { ProductType } from "../product";

export type CartType = {
  id?: number;
  userId?: number;
  date?: Date;
  products?: Product[];
}

export type Product = {
  productId?: number;
  quantity?: number;
}

export type payloadAddProductType = {
  userId: number,
  date: Date,
  products: Product[],
}

export type DetailDataProductType = {
  data: ProductType[],
  quantity: (number | undefined)[]
}

export interface Column {
  id: 'id' | 'userId' | 'date' | 'totalProduct';
  label: string;
  minWidth?: number;
  align?: 'right';
}