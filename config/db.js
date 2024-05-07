const mongoose = require("mongoose"); // Se importa el módulo de mongoose 
require("dotenv").config({ path: ".env" }); // Se importa y se configura el módulo 'dotenv', 
//utilizado para cargar variables de entorno desde un archivo '.env'. 

// Se realiza la conexión a la base de datos utilizando una funcipon asíncrona 
const dbConnection = async () => {
    mongoose
        .connect(process.env.MONGO_URL) // Se utiliza el método "connect" de mongoose, utilizando la URL de conexión "MONGO-URL"
        .then(() => console.log("Estamos conectados con MongoDB")) // Se envía un mensaje si es exitoso
        .catch((err) => console.error(err)); // Se devuelve un error si no es exitoso 
}

module.exports = dbConnection; 