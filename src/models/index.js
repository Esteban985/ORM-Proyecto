import { Categoria } from "./Categoria.js";
import { Producto } from "./Producto.js";
import { Usuario } from './Usuario.js'
import { Cliente } from './Clientes.js'
import { Pedido } from "./Pedido.js";
import { DetallePedido } from "./DetallePedidos.js";

//Una categoria tiene muchos productos
Categoria.hasMany(Producto, { foreignKey: 'categoria_id', as: 'productos' })
//un producto pertenece a una categoria
Producto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categorias' })

//Ejemplo de ralacion de cliente y usario osea uno a uno
//Cliente itene un usuario
// Cliente.hasOne(Usuario, { foreignKey: 'cliente_id', as: 'usuario' })
// //Usuario pertenece a un cliente
// Usuario.belongsTo(Cliente, { foreignKey: 'cliente_id', as: 'clientes' })

Producto.belongsToMany(Pedido, { through: DetallePedido, otherKey: 'pedido_id', foreignKey: 'producto_id', as: 'pedidos' })

//Ejemplo de ralacion de muchos a muchos
//Producto Tiene muchos clientes (a traves de una tabla intermedia)
// Producto.belongsToMany(Cliente, { through: 'ClienteProducto', foreignKey: 'producto_id', as: 'clientes' })
//Cliente tiene muchos productos (a traves de una tabla intermedia)
// Cliente.belongsToMany(Producto, { through: 'ClienteProducto', foreignKey: 'Producto_id', as: 'productos' })

//HasOne
//HasMany
//belongTo
//belongsToMany

export { Categoria, Producto, Usuario, Cliente }