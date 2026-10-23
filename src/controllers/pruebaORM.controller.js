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

//Para obtener un usuario que la ciudad sea Quetzaltenango o Guatemala
const getUsuarioCiudad = async (req, res) => {
    try {
        const usuarios = await Cliente.findAll({
            where: {
                ciudad: {
                    [Op.in]: ['Quetzaltenango', 'Guatemala']
                }
            }
        })

        if (!usuarios) {
            return res.status(404).json({ message: 'No se encontraron usuarios en las ciudades especificadas' });
        }

        res.status(200).json({
            message: 'Usuarios encontrados en la ciudades especificadas',
            data: usuarios
        })
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los usuarios' })
    }
}

export { getUsuarioApellido, getUsuarioCiudad };