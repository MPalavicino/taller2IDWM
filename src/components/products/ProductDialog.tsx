import { Product } from "@/interfaces/Product"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { DialogHeader } from "../ui/dialog";
import Image from "next/image";

interface ProductDialogProps {
    product: Product | null;
    open: boolean;
    onClose: () => void;
}

export const ProductDialog = ({ product, open, onClose }: ProductDialogProps) => {
    if (!product) return null;
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle> {product.name}</DialogTitle>
                    <DialogDescription>Detalle del producto</DialogDescription>
                </DialogHeader>

                <div className = "flex flex-col items-center">  
                    
                    <Image src="/Producto.jpg" alt={product.name} width ={200} height ={200} className="object-contain"/>
                    <p className = "text-blue-700 font-bold text-2x1 mt-4"> ${product.price.toFixed(2)}</p>
                    <p className="text-gray-600 mt-2">{product.description ?? "Sin descripcion"}</p>
                         
                    
                    
                    
                    
                 </div>
            </DialogContent>
        
        </Dialog>
    );
}