"use client";

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { apiBackend } from "@/clients/axios";
import { ResponseAPI } from "@/interfaces/ResponseAPI";
import { User } from "@/interfaces/User";
import { useContext } from "react";
import { AuthContext } from "@/contexts/auth/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner"; // ✅ Importar Toaster aquí

// Validación con Zod
const formSchema = z.object({
  firstName: z.string().min(1, { message: "Nombre requerido" }),
  lastName: z.string().min(1, { message: "Apellido requerido" }),
  email: z.string().email({ message: "Correo inválido" }),
  phone: z.string().min(9, { message: "Teléfono requerido" }),
  password: z.string().min(6, { message: "Mínimo 6 caracteres" }),
  confirmPassword: z.string().min(6, { message: "Confirma tu contraseña" }),
  street: z.string().min(1, { message: "Calle requerida" }),
  number: z.string().min(1, { message: "Número requerido" }),
  commune: z.string().min(1, { message: "Comuna requerida" }),
  region: z.string().min(1, { message: "Región requerida" }),
  postalCode: z.string().min(1, { message: "Código postal requerido" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

export const RegisterPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      street: "",
      number: "",
      commune: "",
      region: "",
      postalCode: "",
    },
  });

  const { auth } = useContext(AuthContext);
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { confirmPassword, ...registerData } = values;
      const { data } = await apiBackend.post<ResponseAPI>("/Auth/register", {
        ...registerData,
        confirmPassword,
      });

      const data_ = Array.isArray(data.data) ? data.data[0] : data.data;
      if (!data_) {
        toast.error("Datos de usuario no recibidos del servidor.");
        return;
      }

      const user_: User = {
        email: data_.email,
        lastName: data_.lastname,
        firstName: data_.firstName,
        token: data_.token,
        role: data_.role,
      };

      auth(user_);
      toast.success("¡Registro exitoso! Redirigiendo...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error: any) {
      console.error("Error completo:", error);

      const errors = error?.response?.data?.errors;
      const message = error?.response?.data?.message;

      if (Array.isArray(errors)) {
        toast.error(errors.join("\n"));
      } else if (message) {
        toast.error(message);
      } else {
        toast.error("Ocurrió un error inesperado.");
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-1/2 w-full bg-blue-700 text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Bienvenido a <br className="hidden md:block" /> la tiendita 
        </h1>
        <p className="text-base md:text-lg text-justify max-w-md">
          Registrate para disfrutar de una experiencia de compra personalizada y acceder a ofertas exclusivas. ¡Todo lo que necesitas en un solo lugar!
        </p>
      </div>

      <div className="md:w-1/2 w-full flex items-center justify-center bg-white px-6 py-10">
        <div className="w-max max-w-2xl space-y-4">
          <h2 className="text-3xl font-bold text-center">Registro</h2>
          <p className="text-sm text-gray-600 text-center">
            ¿Ya tienes cuenta?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Inicia sesión
            </Link>
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[ 
                  { name: "firstName", label: "Nombre" },
                  { name: "lastName", label: "Apellido" },
                  { name: "email", label: "Correo electrónico", type: "email" },
                  { name: "phone", label: "Teléfono", type: "tel" },
                  { name: "password", label: "Contraseña", type: "password" },
                  { name: "confirmPassword", label: "Confirmar contraseña", type: "password" },
                ].map(({ name, label, type = "text" }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input type={type} placeholder={label} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[ 
                  { name: "street", label: "Calle" },
                  { name: "number", label: "Número" },
                  { name: "commune", label: "Comuna" },
                  { name: "region", label: "Región" },
                  { name: "postalCode", label: "Código Postal" },
                ].map(({ name, label }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name as keyof z.infer<typeof formSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input placeholder={label} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <Button type="submit" className="w-full">
                Registrarse
              </Button>
            </form>
          </Form>

          <Toaster position="top-right" richColors /> {/* ✅ Aquí se monta el toast */}
        </div>
      </div>
    </div>
  );
};
