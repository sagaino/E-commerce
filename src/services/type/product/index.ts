export type ProductType = {
  id?: number;
  title?: string;
  price?: number;
  description?: string;
  category?: Category;
  image?: string;
  rating?: Rating;
  quantity?: number;
}

export enum Category {
  Electronics = "electronics",
  Jewelery = "jewelery",
  MenSClothing = "men's clothing",
  WomenSClothing = "women's clothing",
}

export type Rating = {
  rate?: number;
  count?: number;
}
