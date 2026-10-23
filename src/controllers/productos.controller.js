import { Producto } from "../models/Producto.js";
import { Op } from "sequelize";

//Obtener productos por paginacion con limit y offset
const obtenerTodosProductos = async (req, res) => {
    let { limite, pagina, buscar, categoria, precioMin, precioMax, ordenamiento } = req.query;

    pagina = parseInt(pagina) || 1;
    limite = parseInt(limite) || 10;
    const offset = (pagina - 1) * parseInt(limite)

    const where = {}
    if (buscar) {
        where.nombre = {
            [Op.iLike]: `%${buscar}%`
        }
    }

    if (categoria) {
        where.categoria_id = {
            [Op.eq]: categoria
        }
    }

    if (precioMin !== undefined || precioMax !== undefined) {
        where.precio = {};

        if (precioMin !== undefined) {
            where.precio[Op.gte] = Number(precioMin);
        }

        if (precioMax !== undefined) {
            where.precio[Op.lte] = Number(precioMax);
        }
    }

    try {
        const productos = await Producto.findAll({
            limit: parseInt(limite),
            offset: offset,
            where,
            order: [
                [ordenamiento == undefined ? 'producto_id' : 'precio', ordenamiento ? (ordenamiento.toLowerCase() == 'desc' ? 'DESC' : 'ASC') : 'ASC']
            ]
        });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
};

export { obtenerTodosProductos };