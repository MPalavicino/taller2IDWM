export interface Product    {
   id?: number;
  name: string;
  description?: string;
  price: number;
  category?: string;
  urls: string[];          // array de imágenes, por ejemplo
  stock?: number;
  brand?: string;
  isActive?: boolean;
  publicID: string | null; // esto era `null` fijo, lo cambié a string | null
  }
