export interface Product    {
   id: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  urls: string[];          // array de imágenes, por ejemplo
  stock?: number;
  brand?: string;
  isActive?: boolean;
  publicID: string | null;
  condition?:   number; 
  }

  export interface CartItem extends Product {
    productId: number;
    name: string;
    quantity: number;
    price: number;
    pictureUrl: string;
    category: string;
    brand: string;
}
