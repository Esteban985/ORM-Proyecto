import { Router } from "express";
import { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario } from "../controllers/usuarios.controller.js";

const usuariosRouter = Router();

// Definir las rutas para los usuarios
usuariosRouter.get('/', getUsuarios); // Obtener todos los usuarios
usuariosRouter.get('/:id', getUsuarioById); // Obtener un usuario por ID
usuariosRouter.post('/', createUsuario); // Crear un nuevo usuario
usuariosRouter.put('/:id', updateUsuario); // Actualizar un usuario existente
usuariosRouter.delete('/:id', deleteUsuario); // Eliminar un usuario

export { usuariosRouter };