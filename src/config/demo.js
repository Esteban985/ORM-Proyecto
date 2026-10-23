import Usuario from "../models/Usuario.js";

//Ejemplo de consulta con where para obtener un usuario por email

//FindOne obtiene el primer registro que cumpla con la condición, mientras que findAll obtiene todos los registros que cumplan con la condición.
const usuarioExistente = await Usuario.findOne({ where: { email } })

//Operadores de Comparación en Sequelize
//Sequelize proporciona varios operadores de comparación que se pueden utilizar en las consultas para filtrar los resultados. Algunos de los operadores más comunes son:

//Op.eq: Igual a (equal)
//Op.ne: No igual a (not equal)
//Op.gt: Mayor que (greater than)
//Op.gte: Mayor o igual que (greater than or equal)
//Op.lt: Menor que (less than)
//Op.lte: Menor o igual que (less than or equal)
//Op.like: Coincide con un patrón (like)
//Op.iLike: Coincide con un patron sin diferenciar entre mayusculas o minusculas
//Op.notLike: No coincide con un patrón (not like)
//Op.in: Está en un conjunto de valores (in)
//Op.notIn: No está en un conjunto de valores (not in)
//Op.between: Está entre dos valores (between)

//Ejemplo de uso de operadores de comparación
import { Op } from "sequelize";

const usuarios = await Usuario.findAll({
    where: {
        edad: {
            [Op.gt]: 18, // Obtener usuarios mayores de 18 años
        },
        nombre: {
            [Op.like]: "%John%", // Obtener usuarios cuyo nombre contenga "John"
        },
    },
});

//Operadores Lógicos en Sequelize
//Sequelize también proporciona operadores lógicos que se pueden utilizar para combinar condiciones en las consultas. Algunos de los operadores lógicos más comunes son:

//Op.and: Combina condiciones con un operador AND
//Op.or: Combina condiciones con un operador OR
//Op.not: Niega una condición

//Ejemplo de uso de operadores lógicos
const usuarios = await Usuario.findAll({
    where: {
        [Op.and]: [
            { edad: { [Op.gt]: 18 } }, // Mayor de 18 años
            { nombre: { [Op.like]: "%John%" } }, // Nombre que contenga "John"
            { apellido: { [Op.not]: null } }, // Apellido no nulo
        ],
    },
});

//subquery en Sequelize
//Sequelize permite realizar subconsultas (subqueries) utilizando la función sequelize.literal(). Esto es útil cuando se necesita realizar una consulta dentro de otra consulta.

const usuarios = await Usuario.findAll({
    where: {
        id: {
            [Op.in]: sequelize.literal(`(SELECT userId FROM Orders WHERE total > 100)`),
        },
    },
});

//subsconsulta con parametros
const usuarios = await Usuario.findAll({
    where: {
        id: {
            [Op.in]: sequelize.literal(`(SELECT userId FROM Orders WHERE total > :total)`),
        },
    },
    replacements: { total: 100 }, // Reemplaza :total con el valor 100
});


//Ordenamiento
//Sequelize permite ordenar los resultados de una consulta utilizando la opción order. Puedes especificar el campo por el cual deseas ordenar y la dirección (ascendente o descendente).
const usuarios = await Usuario.findAll({
    order: [
        ['nombre', 'ASC'], // Ordenar por nombre de forma ascendente
        ['edad', 'DESC'],  // Ordenar por edad de forma descendente
    ],
});

//Paginación
//Sequelize permite paginar los resultados de una consulta utilizando las opciones limit y offset. Esto es útil cuando se trabaja con grandes conjuntos de datos y se desea mostrar solo una parte de ellos.

const usuarios = await Usuario.findAll({
    limit: 10,   // Número máximo de registros a devolver
    offset: 20,  // Número de registros a omitir (para la segunda página, por ejemplo)
});

//Funciones de Agregacion
//Sequelize proporciona funciones de agregación que se pueden utilizar para realizar cálculos en los datos. Algunas de las funciones de agregación más comunes son:

//count: Cuenta el número de registros
//sum: Suma los valores de un campo
//avg: Calcula el promedio de un campo
//max: Obtiene el valor máximo de un campo
//min: Obtiene el valor mínimo de un campo

const totalUsuarios = await Usuario.count(); // Contar todos los usuarios

const edadPromedio = await Usuario.avg('edad'); // Calcular la edad promedio

const edadMaxima = await Usuario.max('edad'); // Obtener la edad máxima

const edadMinima = await Usuario.min('edad'); // Obtener la edad mínima

const sumaEdades = await Usuario.sum('edad'); // Sumar todas las edades

//Funciones de agregacion sobre un campo especifico con where
const totalUsuariosMayoresDe18 = await Usuario.count({
    where: {
        edad: {
            [Op.gt]: 18, // Mayor de 18 años
        },
    },
});

const sumaEdadesMayoresDe18 = await Usuario.sum('edad', {
    where: {
        edad: {
            [Op.gt]: 18, // Mayor de 18 años
        },
    },
});

//agrupacion con condicion
const usuariosAgrupadosPorCiudad = await Usuario.findAll({
    attributes: ['ciudad', [sequelize.fn('COUNT', sequelize.col('id')), 'totalUsuarios']],
    group: ['ciudad'],
    having: sequelize.literal('COUNT(id) > 5'), // Solo ciudades con más de 5 usuarios
});