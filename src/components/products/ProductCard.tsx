import { Product } from "@/interfaces/Product";
import Image from "next/image";


interface ProductCardProps {
    product: Product;
    onClick: () => void;
}
export const ProductCard = ({ product, onClick }: ProductCardProps) => {
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition" 
        onClick={onClick}>
        <div className="relative w-full h-48 bg-gray-200 ">
            <Image src="/Producto.jpg" alt={product.name} fill className='object-cover'/>
        </div>

        <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-600 mt-2">{product.description}</p>
            <p className="text-blue-600 font-bold mt-2">${product.price.toFixed(2)}</p>
        </div>
        
       </div>
      
    )
}