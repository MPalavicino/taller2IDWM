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
import { useContext, useState } from "react";
import { set } from "zod/v4-mini";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Link from "next/link";
import { decodeJWT } from "@/helpers/decodeJWT";
import { useRouter } from "next/navigation";
const formSchema = z.object({
    email: z.string().min(2, {
        message: "Ingrese un correo valido",
    }),
    password: z.string().min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
    }),
})
export const LoginPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const [errors, setErrors] = useState<string | null>(null);
    const [errorBool, setErrorBool] = useState<boolean>(false);
    const { auth, user } = useContext(AuthContext);
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { data } = await apiBackend.post<ResponseAPI>("/Auth/login", values);
            if (data.success === false) {
                console.error("Error en la respuesta del servidor:", data.message);
                setErrors(data.message || "Error inesperado al iniciar sesión.");
                setErrorBool(true);
                return;
            }
            setErrorBool(false);
            setErrors(null);
            const data_ = Array.isArray(data.data) ? data.data[0] : data.data;
            if (!data_) {
                setErrors("Datos de usuario no recibidos del servidor.");
                setErrorBool(true);
                return;
            }
            const payload = decodeJWT(data_.token);
            if (!payload) {
                setErrors("Token inválido o no decodificable.");
                setErrorBool(true);
                return;
            }
            const user_: User = {
                email: data_.Email,
                password: data_.Password,
                firstName: data_.FirstName,
                lastName: data_.LastName,
                token: data_.token,
                role: payload.Role,
            }
            localStorage.setItem("token", data_.token);
            auth(user_);
            console.log("Usuario logueado:", user);
            console.log("Respuesta del servidor:", data.data);
            console.log("Payload decodificado:", payload.role);
            if(payload.role === "Admin"){
                router.push("http://localhost:3000/");
            } else if(payload.role === "User") {
                router.push("http://localhost:3000/");
            }


        } catch (error: any) {
            console.error("Error completo:", error); // <--- esto te mostrará la estructura
            const errorCatch = error?.response?.data?.message || "Error inesperado al iniciar sesión.";
            setErrors(errorCatch);
            setErrorBool(true);
        }


        console.log("Valores del formulario:", values);
    }
    return (


        <div className="flex flex-col md:flex-row h-screen">
            {/* Left side with image or logo */}
            <div className="md:w-1/2 w-full bg-blue-700 text-white flex flex-col justify-center items-center p-10">
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center" >
                    Bienvenido a <br className="hidden md:block" />la tiendita
                </h1>
                <p className="text-base md:text-lg text-justify max-w-md">
                    Todo lo que necesitas en un solo lugar!
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
                        <Link href="/register" className="text-blue-500 hover:underline">Registrate

                        </Link>, es gratis!
                    </p>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="email"
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
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl>
                                            <Input type="contraseña" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            La contraseña debe tener al menos 6 caracteres.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {errorBool && (
                                <div className="text-red-500 text-sm mb-4">
                                    {errors}
                                </div>
                            )}
                            <div className="flex flex-col md:flex-row items-center justify-between mt-4">
                                <Button type="submit">Iniciar sesión</Button>
                                <Button
                                    type="button"
                                    variant={'destructive'}
                                    onClick={() => {
                                        form.setValue("email", "ignacio.mancilla@gmail.com");
                                        form.setValue("password", "Pa$$word2025");
                                    }}
                                >
                                    Usar Admin
                                </Button>

                                
                            </div>
                        </form>
                    </Form>

                </div>
            </div>

        </div>
    )
}