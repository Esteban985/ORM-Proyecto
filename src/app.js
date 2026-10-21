import express from "express";
import { usuariosRouter } from "./routes/usuarios.route.js";
import { ClientesRouter } from "./routes/clientes.route.js";

const app = express();

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());

// Rutas de ejemplo
app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});
app.use('/usuarios', usuariosRouter)
app.use('/clientes', ClientesRouter)

export default app;