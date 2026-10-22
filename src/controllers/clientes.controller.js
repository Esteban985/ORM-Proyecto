import { Cliente } from "../models/Clientes.js";

const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();

        res.status(200).json({
            message: "Clientes obtenidos correctamente",
            data: clientes
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los clientes",
            error: error.message
        });
    }
}

const getClienteById = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        res.status(200).json({
            message: "Cliente obtenido correctamente",
            data: cliente
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener el cliente",
            error: error.message
        });
    }
};

const createCliente = async (req, res) => {
    const { nombres, apellidos, correo_electronico, telefono, ciudad } = req.body;
    try {
        await Cliente.create({ nombres, apellidos, correo_electronico, telefono, ciudad });

        res.status(201).json({
            message: "Cliente creado correctamente"
        });
    } catch (error) {
        if (error.name == 'SequelizeUniqueConstraintError') {

            return res.status(400).json({
                message: "El correo electrónico ya está registrado",
                error: error.message
            });

        }

        res.status(500).json({
            message: "Error al crear el cliente",
            error: error.message
        });
    }
};

const updateCliente = async (req, res) => {
    const { id } = req.params;
    const { nombres, apellidos, correo_electronico, telefono, ciudad } = req.body;

    const clienteExiste = await Cliente.findOne({ where: { correo_electronico } });

    if (clienteExiste && clienteExiste.id != id) {
        return res.status(400).json({
            message: "El correo electrónico ya está registrado"
        });
    }

    try {
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        await cliente.update({ nombres, apellidos, correo_electronico, telefono, ciudad });

        res.status(200).json({
            message: "Cliente actualizado correctamente",
            data: cliente
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el cliente",
            error: error.message
        });
    }
};

const deleteCliente = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                message: "Cliente no encontrado"
            });
        }

        await cliente.destroy();

        res.status(200).json({
            message: "Cliente eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el cliente",
            error: error.message
        });
    }
};

export { getClientes, getClienteById, createCliente, updateCliente, deleteCliente };