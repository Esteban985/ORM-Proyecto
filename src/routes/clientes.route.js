import { Router } from "express";
import { createCliente, deleteCliente, getClienteById, getClientes, updateCliente } from "../controllers/clientes.controller.js";

const ClientesRouter = Router();

ClientesRouter.get('/', getClientes); // Obtener todos los clientes
ClientesRouter.get('/:id', getClienteById); // Obtener un cliente por ID
ClientesRouter.post('/', createCliente); // Crear un nuevo cliente
ClientesRouter.put('/:id', updateCliente); // Actualizar un cliente existente 
ClientesRouter.delete('/:id', deleteCliente); // Eliminar un cliente

export { ClientesRouter };