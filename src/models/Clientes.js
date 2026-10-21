import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Cliente = sequelize.define("Cliente", {
    cliente_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombres: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Validar que sea un correo electrónico válido
        },
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    ciudad: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Establecer la fecha actual como valor predeterminado
    },
}, {
    tableName: "clientes",
    timestamps: false, // Habilitar timestamps (createdAt y updatedAt)
});

export { Cliente };