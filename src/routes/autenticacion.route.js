import { Router } from "express";
import { login } from "../controllers/login.controller.js";
import { validateSchemadMiddleware } from "../middlewares/validateSchema.js";
import { loginSchema } from "../schemas/login.schema.js";

const routerAuth = Router();

// Ruta para el inicio de sesión
routerAuth.post('/login', validateSchemadMiddleware(loginSchema, 'body'), login);

export { routerAuth };