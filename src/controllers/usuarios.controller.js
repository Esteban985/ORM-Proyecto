import { Usuario } from "../models/Usuario.js";

const getUsuarios = async (req, res) => {
    // Lógica para obtener todos los usuarios
    try {
        const usuarios = await Usuario.findAll({
            attributes: { exclude: ['password'] }
        })

        res.status(200).json({
            messsage: "Usuarios obtenidos correctamente",
            data: usuarios
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los usuarios",
            error: error.message
        })
    }
};

const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        // Lógica para obtener un usuario por ID
        const usuario = await Usuario.findByPk(id, {
            attributes: { exclude: ['password'] }
        })

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            })
        }

        res.status(200).json({
            message: "Usuario obtenido correctamente",
            data: usuario
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el usuario",
            error: error.message
        })
    }
};

const createUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;
    // Lógica para crear un nuevo usuario
    try {
        await Usuario.create({ nombre, email, password })

        res.status(201).json({
            message: "Usuario creado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el usuario",
            error: error.message
        })
    }
};

const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, email } = req.body;
    // Lógica para actualizar un usuario existente
    try {
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        await usuario.update({ nombre, email });

        res.status(200).json({
            message: "Usuario actualizado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el usuario",
            error: error.message
        })
    }
};

const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        // Lógica para eliminar un usuario
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }

        await usuario.destroy();

        res.status(200).json({
            message: "Usuario eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el usuario",
            error: error.message
        });
    }
};

export { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario };