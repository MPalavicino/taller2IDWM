
import { apiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { Product } from "@/interfaces/Product";

export interface ProductFilters {
    pageNumber: number;
    pageSize: number;
    search?: string;
    categories?: string;
    brands?: string;
    orderBy?: "price" | "priceDesc";
}

export const ProductServices = {
    async fetchProducts(filters: ProductFilters): Promise<Product[]>  {
        const {data} = await apiBackend.get<ResponseAPI>("/Product", {
            params: filters
        });

        if (!data.success) {
            throw new Error(data.message || "Error al obtener productos.");
        }
        if (!data.data || !Array.isArray(data.data)) {
            throw new Error("No se encontraron productos.");
        }
        if (data.errors){
            console.error("Errores del servidor:", data.errors);
        }

        return data.data as Product[];
    }
}
