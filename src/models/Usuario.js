import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import bcrypt from 'bcrypt';

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    tableName: 'usuarios',
    timestamps: false, // Habilitar timestamps (createdAt y updatedAt)
    // hooks: {
    //     beforeCreate: async (usuario) => {
    //         // Hash de la contraseña antes de guardar el usuario
    //         const saltRounds = parseInt(process.env.SALTS_ROUND) || 10;
    //         const hashedPassword = await bcrypt.hash(usuario.password, saltRounds);
    //         usuario.password = hashedPassword;
    //     }
    // }
});

Usuario.prototype.hashPassword = async function () {
    const saltRounds = parseInt(process.env.SALTS_ROUND) || 10;
    this.password = await bcrypt.hash(this.password, saltRounds)
};

Usuario.prototype.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

export { Usuario };