// Se exporta el modelo 
const Product = require('../models/Product');

//Función para agregar productos
exports.addProducts = async (req, res) => {
    try {
        let products = new Product(req.body);
        await products.save();
        res.status(201).send(products);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al agregar el producto");
    }
}


//Función para mostrar productos 
exports.getProducts = async (req, res) => {
    try {
        let products = await Product.find();
        res.json(products);
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al mostrar los productos");
    }
}

//Función para mostrar un único producto por su ID 
exports.getProduct = async (req, res) => {
    try {
        let products = await Product.findById(req.params.id);
        if (!products) {
            res.status(404).json({ msg: "No se encuentra el producto con ese ID " });
        } else {
            res.send(products);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al mostrar el producto");
    }
}

//Función para modificar 1 producto
exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ msg: "No se encontró el producto con ese ID" });
        } else {
            res.json(product);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al modificar el producto");
    }
}

//Función para eliminar productos
exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);


        if (!product) {
            return res.status(404).json({ msg: "No se encontró el producto con ese ID" });
        }

        await Product.findByIdAndDelete(req.params.id);


        res.json({ msg: "El producto fue eliminado con éxito" });
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error al eliminar el producto");
    }
};
