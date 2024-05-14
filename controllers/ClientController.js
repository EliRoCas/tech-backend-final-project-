// Exportamos el modelo 
const Client = require('../models/Client');

// Se crea la función para agregar clientes 
exports.addClients = async (req, res) => {
    try {
        let clients = new Client(req.body);
        await clients.save();
        res.status(201).send(clients);


    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al agregar el cliente');
    }
}

// Se crea una funcion para mostrar clientes

exports.showClients = async (req, res) => {
    try {
        const clients = await Client.find();
        res.json({clients});

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al mostrar un cliente');
    }
}

// Se crea una función para mostrar un único cliente por ID 
exports.showClient = async (req, res) => {
    try {
        const clients = await Client.findById(req.params.id);
        if (!clients) {
            res.status(404).json({ msg: "No se encuentra el cliente con ese ID" });
        } else {
            res.send(clients);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al mostrar un cliente en la DB");
    }
}

// Función para eliminar clientes 
exports.deleteClients = async (req, res) => {
    try {
        const clients = await Client.findById(req.params.id);
        if (!clients) {
            res.status(404).json({ msg: "El cliente con ese ID no se encuentra en la DB" });
            return
        }
        await Client.findOneAndDelete({ _id: req.params.id });
        res.json({ msg: "El cliente fue eliminado con éxito" });

    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al eliminar un cliente en la DB");
    }
}

// Modificar un cliente 
exports.updateClients = async (req, res) => {
    try {
        let client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!client) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.json({client})
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error al modificar al cliente');

    }
}