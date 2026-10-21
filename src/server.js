import 'dotenv/config';
import app from './app.js';
import { sequelize } from './config/database.js';

const PORT = process.env.PORT || 5000;

const inicializarServidor = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida correctamente.');
        
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en el puerto ${PORT}`);
        });
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
        process.exit(1); // Salir del proceso con un código de error
    }
};

inicializarServidor();