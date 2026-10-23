import { Router } from "express";
import { getUsuarioApellido, getUsuarioCiudad } from "../controllers/pruebaORM.controller.js";

const pruebaORMRouter = Router();

pruebaORMRouter.get('/prueba', getUsuarioApellido)
pruebaORMRouter.get('/prueba2', getUsuarioCiudad)

export { pruebaORMRouter };