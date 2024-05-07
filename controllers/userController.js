const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.userCreation = async (req, res) => {

    // Se valida si existen errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Se verifica que el usuario registrado sea único
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "El usuario ya existe" });
        }

        // Se crea el nuevo usuario 
        user = new User(req.body);
        // 
        user.password = await bcryptjs.hash(password, 8);

        // Se guarda el usuario 
        await user.save();


        // Si las validaciones son exitosas, se firma el Token 
        const payload = {
            user: { id: User.id },
        };
        jwt.sign(

            payload,
            process.env.SECRET,
            {
                expiresIn: 3600,
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
