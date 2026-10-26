import { ProductoCollectionDTO, ProductoDTO } from "../dtos/Producto.dto.js";
import { Categoria } from "../models/Categoria.js";
import { Pedido } from "../models/Pedido.js";
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
        res.json({
            message: 'Productos obtenidos correctamente',
            data: ProductoCollectionDTO(productos)
        });
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
};

const crearProducto = async (req, res) => {
    const { nombre, marca, precio, stock, categoria_id } = req.body

    try {
        const categoriasExistentes = await Categoria.findByPk(categoria_id)

        if (!categoriasExistentes) {
            return res.status(404).json({
                message: 'Categoria no existente'
            })
        }

        const nuevoProducto = await Producto.create({
            nombre,
            marca,
            precio,
            stock,
            categoria_id
        })

        res.status(201).json({
            message: 'Producto creado correctamente',
            data: nuevoProducto
        })
    } catch (error) {
        res.status(500).json({ message: 'Ocurrio un error al crear el producto' })
    }
}

const obtenerProductPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findByPk(id, {
            include: [{
                required: true, model: Categoria, as: 'categorias', attributes: { exclude: ['descripcion'] }
            }, {
                model: Pedido,
                as: 'pedidos'
            }]
        })
        if (!producto) {
            res.status(404).json({
                message: 'Producto no encontrado'
            })
        } else {
            res.status(200).json({
                message: 'Producto obtenido correctamente',
                data: ProductoDTO(producto)
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Ocurrio un error al intentar obtener el producto'
        })
    }
}

export { obtenerTodosProductos, crearProducto, obtenerProductPorId };