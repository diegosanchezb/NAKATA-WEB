import { z } from "zod";

export const userRegisterScheme = z.object({
  email: z.string().email("El email no es válido."),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracateres."),
  fullName: z.string().min(1, "El nombre completo es requerido"),
  phone: z.string().optional(),
});

export const addressSchema = z.object({
  addressLine1: z
    .string()
    .min(1, "La dirección es requerida")
    .max(100, "La dirección no debe exceder los 100 caracteres."),
  addressLine2: z
    .string()
    .max(100, "La dirección no debe exceder los 100 caracteres.")
    .optional(),
  state: z
    .string()
    .min(1, "La state es requerida")
    .max(50, "La state no puede exceder los 50 caracteres"),
  city: z
    .string()
    .min(1, "La ciudad/localidad es requerida")
    .max(50, "La localidad no puede exceder los 50 caracteres"),
  postalCode: z
    .string()
    .min(1, "El código postal es requerido")
    .max(10, "El código postal no puede exceder los 10 caracteres"),
  country: z.string().min(1, "El país es requerido para realizar el envío"),
});

export type UserRegisterFormValues = z.infer<typeof userRegisterScheme>;
export type addressFormValues = z.infer<typeof addressSchema>;
