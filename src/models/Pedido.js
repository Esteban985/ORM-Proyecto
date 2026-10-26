import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Pedido = sequelize.define("Pedido", {
    pedido_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cliente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    estado: {
        type: DataTypes.STRING(30),
        allowNull: false,
        defaultValue: 'Pendiente',
        validate: {
            isIn: [['Pendiente', 'Pagado', 'Enviado', 'Entregado', 'Cancelado']] // Validación equivalente al check de SQL
        }
    }
}, {
    tableName: "pedidos",
    timestamps: false,
});

export { Pedido };