"use client";

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

import z from "zod";
import { apiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { User } from "@/interfaces/User";
const formSchema = z.object({
  correo: z.string().min(2, {
    message: "Ingrese un correo valido",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.", 
    }),
})
export const LoginPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                correo: "",
                password: "",
            },
        });
        const onSubmit = async(values: z.infer<typeof formSchema>) => {
            try {
                const data= await apiBackend.post<any>("Auth/login",values); 
                //const user_:User={
               //     email: data.data.email,
                //    lastName: data.data.lastname,
                //    firstName: data.data.firstName,
                //    token: data.data.token,
                //}


            }catch (error: any) {
                let errorCatch = error.responde.data.message;
                console.error("Error al iniciar sesion:", errorCatch);
            }

            
            console.log("Valores del formulario:", values);
        }
    return (

    
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left side with image or logo */}
            <div className = "md:w-1/2 w-full bg-blue-700 text-white flex flex-col justify-center items-center p-10">
             <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" >
               Bienvenido a <br className="hidden md:block"/> Intro. al desarrollo web
                </h1> 
                <p className="text-base md:text-lg text-justify max-w-md">
                    No se que poner aqui, pero este es un ejemplo de una pagina de inicio de sesion.
                </p>
            </div>
        
            {            /* Right side with login form */}
            <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-6 py-10">   
                <div className="w-full max-w-md">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center md:text-left">Nuestra Pagina</h2>   
                    <h3 className="text-lg md:text-xl font-medium mb-2 text-center md:text-left">
                        Bienvenido de nuevo!
                    </h3>
                    <p className="mb-4 text-sm text-gray-600 text-center md:text-left">
                        No tienes cuenta?{" "}
                        <a href="#" className="text-blue-500 hover:underline">Registrate

                        </a>, es gratis!
                    </p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="correo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Correo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="correo@ejemplo.com" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Correo electronico.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Your password must be at least 6 characters long.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Iniciar sesion</Button>
                        </form>
                    </Form>

                </div>
            </div>
                 
        </div>
    ) 
}