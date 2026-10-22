import jwt from 'jsonwebtoken';

const validarUsuario = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del encabezado Authorization

    if (!token) {
        return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decoded; // Guardar la información del usuario en la solicitud
    } catch (error) {
        return res.status(401).json({ message: "Token inválido" });
    }

    next();
};

export { validarUsuario };