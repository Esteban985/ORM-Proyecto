export const ProductoDTO = (producto) => {
    return {
        producto_id: producto.producto_id,
        nombre: producto.nombre,
        marca: producto.marca
    }
}

export const ProductoCollectionDTO = (productos) => {
    return productos.map(producto => ProductoDTO(producto))
}