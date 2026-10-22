import z from "zod";

const crearActualizarClienteSchema = z.object({
    nombres: z.string().min(1, "El nombre es obligatorio"),
    apellidos: z.string().min(1, "Los apellidos son obligatorios"),
    correo_electronico: z.string().email("El correo electrónico no es válido"),
    telefono: z.string().min(1, "El teléfono es obligatorio"),
    ciudad: z.string().min(1, "La ciudad es obligatoria"),
});

export { crearActualizarClienteSchema };