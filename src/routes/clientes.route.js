import { Router } from "express";
import { createCliente, deleteCliente, getClienteById, getClientes, updateCliente } from "../controllers/clientes.controller.js";
import { validateSchemadMiddleware } from "../middlewares/validateSchema.js";
import { crearActualizarClienteSchema } from "../schemas/clienteSchemas.js";

const ClientesRouter = Router();

ClientesRouter.get('/', getClientes); // Obtener todos los clientes
ClientesRouter.get('/:id', getClienteById); // Obtener un cliente por ID
ClientesRouter.post('/', validateSchemadMiddleware(crearActualizarClienteSchema, 'body'), createCliente); // Crear un nuevo cliente
ClientesRouter.put('/:id', validateSchemadMiddleware(crearActualizarClienteSchema, 'body'), updateCliente); // Actualizar un cliente existente 
ClientesRouter.delete('/:id', deleteCliente); // Eliminar un cliente

export { ClientesRouter };