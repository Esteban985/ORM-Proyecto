import { Router } from "express";
import { getUsuarioApellido } from "../controllers/pruebaORM.controller.js";

const pruebaORMRouter = Router();

pruebaORMRouter.get('/prueba', getUsuarioApellido)

export { pruebaORMRouter };