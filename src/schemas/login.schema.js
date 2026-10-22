import z from "zod";

const loginSchema = z.object({
    email: z.string().email("El correo electrónico no es válido"),
    password: z.string().min(1, "La contraseña debe tener al menos 1 caracteres"),
});

export { loginSchema };