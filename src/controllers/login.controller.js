import { Usuario } from "../models/Usuario.js";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        const isPasswordValid = await usuario.validatePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign({ id: usuario.id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Aquí puedes generar un token JWT si lo deseas y enviarlo en la respuesta
        res.status(200).json({
            message: "Inicio de sesión exitoso",
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al iniciar sesión",
            error: error.message
        });
    }
};

export { login };