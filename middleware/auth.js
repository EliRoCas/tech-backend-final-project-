const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

    // Se crea una constante que leerá el token del header
    const token = req.header("x-auth-token");

    // Se valida que exista un token 
    if (!token) { //Si el token está vacío o no existe
        return res.status(400).json({ msg: "Permiso inválido, no existe el token" })
    }

    // Se valida el token 
    try {
        const encryption = jwt.verify(token.process.env.SECRET)
        req.user = encryption.user;
        next();
    } catch (error) {
        res.status(400).json({ msg: "Token inválido" });
    }
}