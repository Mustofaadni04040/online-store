export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  stock: [
    {
      size: string;
      qty: number;
    }
  ];
  created_at: Date;
  updated_at: Date;
};
