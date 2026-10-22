import express from "express";
import { usuariosRouter } from "./routes/usuarios.route.js";
import { ClientesRouter } from "./routes/clientes.route.js";
import { routerAuth } from "./routes/autenticacion.route.js";
import { validarUsuario } from "./middlewares/validarUsuario.middleware.js";
import { pruebaORMRouter } from "./routes/pruebaORM.router.js";

const app = express();

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Rutas de ejemplo
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.use('/auth', routerAuth)

app.use(validarUsuario)

app.use('/usuarios', usuariosRouter)
app.use('/clientes', ClientesRouter)
app.use('/prueba-ORM', pruebaORMRouter)

export default app;