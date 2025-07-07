"use client";

import { RegisterPage } from "@/views/registerPage/registerPage";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";

export default function Register() {

   const { user } = useContext(AuthContext);
      const router = useRouter();
      
    
  
        useEffect(() => {
                if (localStorage.getItem("token")) {
                    router.push('http://localhost:3000/');
                    return;
                }
      
        
            }, [user, router]);
  

  return <RegisterPage />;
}