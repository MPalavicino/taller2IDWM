import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";


interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
}


export const LoginDialog = ({ open, onClose }: LoginDialogProps) => {
    const router = useRouter();

    const handleContinue = () => {
        onClose();
        router.push('/login');
    }

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Iniciar Sesión</AlertDialogTitle>
                    <AlertDialogDescription>
                        Para agregar productos al carrito, por favor inicia sesión primero.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={handleContinue}>Continuar</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}