import { Router } from "express";
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from "../controllers/usuarios.controller.js";
import { validateSchemadMiddleware } from "../middlewares/validateSchema.js";
import { createUsuarioSchema, updateUsuarioSchema } from "../schemas/usuariosSchemas.js";

const usuariosRouter = Router();

// Definir las rutas para los usuarios
usuariosRouter.get('/', getUsuarios); // Obtener todos los usuarios
usuariosRouter.get('/:id', getUsuarioById); // Obtener un usuario por ID
usuariosRouter.post('/', validateSchemadMiddleware(createUsuarioSchema), createUsuario); // Crear un nuevo usuario
usuariosRouter.put('/:id', validateSchemadMiddleware(updateUsuarioSchema), updateUsuario); // Actualizar un usuario existente
usuariosRouter.delete('/:id', deleteUsuario); // Eliminar un usuario

export { usuariosRouter };