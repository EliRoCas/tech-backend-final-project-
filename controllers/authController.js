const users = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.userAuthentication = async (req, res) => {

    // Se valida si existen errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Se verifica la existencia de usuario registrado 
        let user = await users.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "El usuario no está registrado" });
        }

        // Se verifica la contraseña 
        const correctPassword = await bcryptjs.compare(password, user.password);
        if (!correctPassword) {
            // Se deja este mensaje sobre le sugerido por cuestiones de buenas prácticas de seguridad
            return res.status(400).json({ msg: "El usuario y/o la contraseña son incorrectos" });
        }

        // Si las validaciones son exitosas, se firma el Token 
        const payload = {
            user: { id: user._id },
        };
        jwt.sign(

            payload,
            process.env.SECRET,
            {
                expiresIn: 43200, // aproximadamente, una hora
            },
            (error, token) => {
                if (error) throw error;
                //se lanza un mensaje de confirmación 
                res.json({ token });
            }
        );
    } catch (error) {
        console.log("¡Lo sentimos!, ha ocurrido un error");
        console.log(error);
        res.status(400).send("Ha ocurrido un error");
    }
};

exports.authenticatedUser = async (req, res) => {
    try {
        const user = await users.findById(req.user.id);
        res.json({ user });

    } catch (error) {
        res.status(400).json({ msg: "¡Lo sentimos!, un error ha ocurrido." });
    }
}

