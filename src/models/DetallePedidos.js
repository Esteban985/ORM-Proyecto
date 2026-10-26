import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const DetallePedido = sequelize.define("DetallePedido", {
    detalle_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pedido_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    producto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1 // Respeta el check cantidad > 0
        }
    },
    precio_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
            min: 0.01 // Respeta el check precio_unitario > 0
        }
    }
}, {
    tableName: "detalle_pedidos",
    timestamps: false,
});

export { DetallePedido };