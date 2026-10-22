import { Cliente } from "../models/Clientes.js";
import { Op } from "sequelize";

//Para obtener un usuario que su apellido sea igual a Ruiz
const getUsuarioApellido = async (req, res) => {
    try {
        const usuario = await Cliente.findAll({
            where: {
                apellidos:
                    { [Op.like]: "Ruiz" }
            }
        })

        if (!usuario) {
            return res.status(404).json({ message: "Clientes con ruiz no existentes" });
        }

        res.status(200).json({
            message: 'Clientes con apellido ruiz encontrados',
            data: usuario
        });
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los clientes", error: error.message });
    }
}

export { getUsuarioApellido };