import { Router } from "express";
import { crearProducto, obtenerProductPorId, obtenerTodosProductos } from "../controllers/productos.controller.js";
import { validateSchemadMiddleware } from "../middlewares/validateSchema.js";
import { filtroProductoSchema } from "../schemas/producto.schema.js";

const routerProductos = Router();

routerProductos.get('/', validateSchemadMiddleware(filtroProductoSchema, 'query'), obtenerTodosProductos)
routerProductos.get('/:id', obtenerProductPorId)
routerProductos.post('/', crearProducto)

export { routerProductos }