import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/auth/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return(
        <><AuthProvider>
            {children}
        </AuthProvider></> 
    );
}

