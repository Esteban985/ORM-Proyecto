import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Categoria = sequelize.define('categoria', {
    categoria_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'categorias',
    timestamps: false
})

export { Categoria }