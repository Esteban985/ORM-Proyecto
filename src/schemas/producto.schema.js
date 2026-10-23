import { z } from "zod";

const filtroProductoSchema = z
    .object({
        precioMin: z.coerce.number().min(0).optional(),
        precioMax: z.coerce.number().min(0).optional(),
    })
    .refine(
        (data) => {
            if (
                data.precioMin !== undefined &&
                data.precioMax !== undefined
            ) {
                return data.precioMin <= data.precioMax;
            }

            return true;
        },
        {
            message: "El precio mínimo no puede ser mayor al máximo",
            path: ["precioMax"],
        }
    );

export { filtroProductoSchema }