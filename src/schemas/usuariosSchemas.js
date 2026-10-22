import z from "zod";

const createUsuarioSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("El correo electrónico no es válido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const updateUsuarioSchema = z.object({
    nombre: z.string().min(1, "El nombre es obligatorio"),
    email: z.string().email("El correo electrónico no es válido"),
});

export { createUsuarioSchema, updateUsuarioSchema };